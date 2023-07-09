import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl: String = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  ping(){
    return this.http.get(this.baseUrl +"/api/ping");
  }

  /**
   * Login del usuario
   * @param usuario
   * @returns
   */
  login(usuario: any){
    let params = new HttpParams({
      fromObject: { username: usuario.email, password: usuario.clave },
    });

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
    };


    return this.http.post(this.baseUrl + "/api/login", params, httpOptions);
  }

  estaLogeado(){
    var logeado = false;
    var token = sessionStorage.getItem("token");
    var usuario = sessionStorage.getItem("usuario");

    if(token && usuario)
      logeado = true;

    return logeado;
  }

  getToken(){
    return sessionStorage.getItem("token");
  }

  getUsuario(){
    return sessionStorage.getItem("usuario");
  }

  /**
   * Obtiene los usuarios
   * @param nombre
   * @returns la lista de usuarios
   */
  getUsuarios(nombre: string){
    return this.http.get(this.baseUrl + "api/usuario?"+nombre);
  }


}
