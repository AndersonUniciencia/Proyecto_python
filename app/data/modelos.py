from decimal import Decimal
from h11 import Data
from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, DECIMAL, String, DateTime, VARCHAR, Text, func
from sqlalchemy.orm import relationship

from .database import Base

print("Creando modelos")


class Empleados(Base):
    __tablename__ = "dbo.employees"

    EmployeeID = Column(Integer, primary_key=True, index=True)
    LastName = Column(String(9))
    FirstName = Column(String(8))
    Title = Column(String(24))
    TitleOfCourtesy = Column(String(4))
    BirthDate = Column(String(19))
    HireDate = Column(String(19))
    Address = Column(String(30))
    City = Column(String(8))
    Region = Column(String(2))
    PostalCode = Column(String(7))
    Country = Column(String(3))
    HomePhone = Column(String(14))
    Extension = Column(Integer)
    Notes = Column(String(50))
    ReportsTo = Column(String(1))
    PhotoPath = Column(String(38))
    Usuarios = relationship("Usuarios", back_populates="Empleados")
    Ordenes = relationship("Ordenes", back_populates="Empleados")


class Usuarios(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre_usuario = Column(String(50))
    email = Column(String(50))
    clave = Column(String(50))
    rol = Column(String(50))
    id_empleado =  Column(Integer, ForeignKey("dbo.employees.EmployeeID"), nullable=False, index=True)   
    activo = Column(Boolean)

    Empleados = relationship("Empleados", back_populates="Usuarios")


class Categorias(Base):
    __tablename__= "dbo.categories"

    CategoryID = Column(Integer, primary_key=True, index=True)
    CategoryName = Column(String(14))
    Description = Column(String(58))
    Picture = Column(String(36))

    Productos = relationship("Productos", back_populates="Categorias")



class Productos(Base):
    __tablename__ = "dbo.products"

    ProductID = Column(Integer, primary_key=True, index=True)
    ProductName = Column(String(32))
    CategoryID = Column(Integer, ForeignKey("dbo.categories.CategoryID"), nullable=False, index=True)   
    QuantityPerUnit = Column(String(20))
    UnitPrice = Column(DECIMAL(7, 4))
    UnitsInStock = Column(Integer)
    UnitsOnOrder = Column(Integer)
    ReorderLevel = Column(Integer)
    Discontinued = Column(Integer)

    Categorias = relationship("Categorias", back_populates="Productos")
    DetalleOrdenes = relationship("DetalleOrdenes", back_populates="Productos")

class Ordenes(Base):
    __tablename__ = "dbo.orders"

    OrderID = Column(Integer, primary_key=True, index=True)
    CustomerID = Column(Integer, ForeignKey("dbo.customers.CustomerID"), nullable=False, index=True)
    EmployeeID = Column(Integer, ForeignKey("dbo.employees.EmployeeID"), nullable=False, index=True)
    OrderDate = Column(Date)
    RequiredDate = Column(Date)
    ShippedDate = Column(Date)
    ShipVia = Column(Integer)
    Freight = Column(DECIMAL(8, 4))
    ShipName = Column(String(34))
    ShipAddress = Column(String(46))
    ShipCity = Column(String(15))
    ShipRegion = Column(String(13))
    ShipPostalCode = Column(String(9))
    ShipCountry = Column(String(11))

    DetalleOrdenes = relationship("DetalleOrdenes", back_populates="Ordenes")
    Empleados = relationship("Empleados", back_populates="Ordenes")
    Clientes = relationship("Clientes", back_populates="Ordenes")

class DetalleOrdenes(Base):
    __tablename__ = "dbo.order details"

    id_detalle = Column(Integer, primary_key=True, index=True)
    OrderID = Column(Integer, ForeignKey("dbo.orders.OrderID"), nullable=False, index=True)
    ProductID = Column(Integer, ForeignKey("dbo.products.ProductID"), nullable=False, index=True)
    UnitPrice = Column(DECIMAL(7,4))
    Quantity = Column(Integer)
    Discount = Column(DECIMAL(3,2))

    Ordenes = relationship("Ordenes", back_populates="DetalleOrdenes")
    Productos = relationship("Productos", back_populates="DetalleOrdenes")

class Clientes(Base):
    __tablename__ = "dbo.customers"

    CustomerID = Column(Integer, primary_key=True, index=True)
    CompanyName = Column(String(36))
    ContactName = Column(String(23))
    ContactTitle = Column(String(30))
    Address = Column(String(46))
    City = Column(String(15))
    Region = Column(String(13))
    PostalCode = Column(String(9))
    Country = Column(String(11))
    Phone = Column(String(17))
    Fax = Column(String(17))

    Ordenes = relationship("Ordenes", back_populates="Clientes")
