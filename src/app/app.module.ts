import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { InterseptorServiceService } from './config/interseptor-service.service';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { OrdenesComponent } from './component/ordenes/ordenes.component';
import { ProductosComponent } from './component/productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    UsuariosComponent,
    OrdenesComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterseptorServiceService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
