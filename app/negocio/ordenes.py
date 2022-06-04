from datetime import datetime, timedelta
from fastapi import HTTPException, Query
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.config import settings
from app.data.modelos import Empleados, Ordenes, Productos, Usuarios
from jose import JWTError, jwt

def get_ordenes(db: Session, usuario, desde, hasta):
    #Obtiene el rango de fechas
    i = datetime.strptime(desde, '%Y-%m-%d')
    f = datetime.strptime(hasta, '%Y-%m-%d') + timedelta(1)

    query = db.query(Ordenes).where(i <= Ordenes.OrderDate, Ordenes.OrderDate < f)

    #usuario = dict(** usuario)

    if usuario.rol != "admin":
        #Obtiene el id del empleado
        idEmpleado = db.query(Empleados.EmployeeID).join(Usuarios).where(Usuarios.id == usuario.id)
        if idEmpleado == None:
            raise HTTPException(status_code=404, detail= {"error" : "No se encontró el empleado con el id:" + usuario.id})
        #Obtiene las ordenes del empleado
        query = query.where(Ordenes.EmployeeID == idEmpleado)

    return query.order_by(func.DATE(Ordenes.OrderDate).desc()).all()
