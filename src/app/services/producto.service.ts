import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  baseUrl: String = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  getProductos(nombre: string){
    var url = this.baseUrl + "api/productos";
    if(nombre)
      url += "?nombre="+nombre

    return this.http.get(url);
  }

  postProducto(producto: any){
    return this.http.post(this.baseUrl + "api/producto", producto);
  }

  eliminarProducto(idProducto: number){
    return this.http.delete(this.baseUrl + "api/producto?idProducto" + idProducto);
  }
}
