from fastapi import HTTPException, Query
from sqlalchemy.orm import Session
from app.config import settings
from app.data.modelos import Productos
from jose import JWTError, jwt

#Obtiene los productos
def getProductos(db: Session):
    productos = db.query(Productos).order_by(Productos.ProductName).all()
    return productos

#Obtiene el producto por el id
def getProducto(db: Session, idProducto):
    producto = db.query(Productos).where(Productos.ProductID == idProducto).first()

    if producto == None:
        raise HTTPException(status_code=404, detail= {"error" : "No se encontró el producto con el id:" + idProducto})

    return producto

#Edita o crea un producto
def guardarProducto(db: Session, productoNew: Productos):

    productoOld = db.query(Productos).where(Productos.ProductID == productoNew.ProductID).first()

    if productoOld == None:
        db.add(productoNew)
    else:
        productoOld.ProductName = productoNew.ProductName
        productoOld.CategoryID = productoNew.CategoryID
        productoOld.QuantityPerUnit = productoNew.QuantityPerUnit
        productoOld.UnitPrice = productoNew.UnitPrice
        productoOld.UnitsInStock = productoNew.UnitsInStock
        productoOld.UnitsOnOrder = productoNew.UnitsOnOrder
        productoOld.ReorderLevel = productoNew.ReorderLevel
        productoOld.Discontinued = productoNew.Discontinued
    #Guarda los cambios
    db.commit()

    return productoNew

#Elimina el producto
def eliminar(db:Session, idProducto):
    producto = db.query(Productos).where(Productos.ProductID == idProducto).first()

    if producto == None:
        raise HTTPException(status_code=404, detail= {"error" : "No se encontró el producto con el id:" + idProducto})
    #Validar si se esta utilizando el producto en otra tabla antes de eliminar
    #Elimina el producto
    db.delete(producto)
    db.commit()
    