from datetime import datetime, timedelta
from pydantic import BaseModel
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.config import settings
from app.data.modelos import Usuarios
from jose import JWTError, jwt

#Utilizado para guardar los datos dentro del token
class TokenData(BaseModel):
    nombre_usuario: str | None = None

#Obtiene el usuario
def get_usuario(db: Session, documento):
    usuario = db.query(Usuarios).where(Usuarios.nombre_usuario == documento).first()

    if usuario == None:
        usuario = db.query(Usuarios).where(Usuarios.email == documento).first()
    
    return usuario

#Autentifica el usuario con el nombre del usuario o con el correo electronico y su clave
def autenticar(db: Session, usuario_nombre: str, password: str):
    #obtiene el usuario
    usuarios = db.query(Usuarios).filter(or_( Usuarios.nombre_usuario == usuario_nombre, Usuarios.email == usuario_nombre)).all()
    #Valida la clave
    usuario = None
    for user in usuarios:
        if user.clave ==  password:
            usuario = user
    
    if usuario == None:
        return False
    
    return usuario

#Crea el token con los datos y el tiempo limitado
def crea_acceso_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    #Obtiene el tiempo de valides del token
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    #Genera el token
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algoritmo_encriptar)
    
    return encoded_jwt



