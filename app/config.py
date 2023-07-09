from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "inventario"
    #nombre de la conexion de la base de datos
    #root:usuario : password
    #@ruta de la base de datos
    data_base: str = "mysql+pymysql://root:1234@localhost:3306/proyecto_python"
    debug: bool = True
    #Key utilizada para el decodificacion del token
    secret_key: str = "dWe71iKNVP9H53LXaST7ABYUr3DSzVQ15z816UpOgjjPGJFl/lwfSROYA+j1+Ihkqxa0t6dundxnlJHP6uoaiS9m4zp01Ksuj4AArfQAsFFBq86D"
    #tilizado para firmar el token JWT
    algoritmo_encriptar: str = "HS256"
    #Tiempo de validez del token
    timepo_acceso: int = 30

settings = Settings()
