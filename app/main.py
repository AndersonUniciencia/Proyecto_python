from datetime import timedelta
from jose import JWTError, jwt
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from app.config import settings
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.data.database import SessionLocal, Base, engine
from app.data.modelos import  Usuarios, Empleados
from app.negocio import usuarios, productos, ordenes

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    #Indica los headers que el navegador puede ver
    expose_headers=["Token"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  


#https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/
#Obtiene el usuario logeado del token
async def getUsuarioActual(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "No pudo validar las credenciales",
        headers = {"WWW-Authenticate": "Bearer"},
    )
    try:
        #decodifica el token
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algoritmo_encriptar])
        #obtiene los datos
        documento: str = payload.get("sub")
        if documento is None:
            raise credentials_exception
        token_data = usuarios.TokenData(nombre_usuario=documento)
    except JWTError:
        raise credentials_exception
    #Obtiene el usuario de la empresa
    usuario = usuarios.get_usuario(db, token_data.nombre_usuario)
    if usuario is None:
        raise credentials_exception
    
    return usuario

#Valida que el usuario este activo y renueva el token
async def getUsuarioActivado(response: Response, usuario: Usuarios = Depends(getUsuarioActual)):
    #Valida que el usuario de la empresa este activo
    if usuario.activo == False:
        raise HTTPException(status_code=400, detail="Empresa no se encuentra activa")
    
    #Obtiene el nuevo token
    new_token = usuarios.crea_acceso_token(
        data={"sub": usuario.email}, expires_delta=None)
    #Guarda el token en el header como token para la respuesta
    response.headers["Token"] = new_token
    
    return usuario


#Estado del servicio
@app.get("/api/ping")
async def ping(db: Session = Depends(get_db)):
    #Revisa la conexión con la base de datos
    e = db.query(Empleados).first()
    return {"estado": "OK", "version": "1.0", "Usuario": e}

@app.post("/api/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    #Autentifica el usuario de la empresa
    usuario = usuarios.autenticar(db, form_data.username, form_data.password)
    
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrecto el usuario o clave",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    #Obtiene el tiempo de vencimiento del token por defecto
    access_token_expires = timedelta(minutes = settings.timepo_acceso)
    #genera el token
    access_token = usuarios.crea_acceso_token(
        data={"sub": usuario.email}, expires_delta=access_token_expires
    )
    #usuario = usuarios.get_usuario_completo(db, usuario.id);
    #Elimina la clave
    usuario.clave = None
    
    return {"access_token": access_token, "token_type": "bearer", "usuario":  usuario}

@app.get("/api/ordenes")
async def getOrdenes(request : Request, desde, hasta, db: Session = Depends(get_db), user: Usuarios = Depends(getUsuarioActivado)):
    return ordenes.get_ordenes(db, user, desde, hasta)


@app.get("/api/productos")
async def getProductos(request : Request, db: Session = Depends(get_db), usuario: Usuarios = Depends(getUsuarioActivado)):
    return productos.getProductos(db)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)