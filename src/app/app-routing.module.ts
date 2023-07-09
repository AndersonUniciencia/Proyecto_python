import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { OrdenesComponent } from './component/ordenes/ordenes.component';
import { ProductosComponent } from './component/productos/productos.component';
import { LoginComponent } from './component/login/login.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: [AuthGuard]? "inicio":"login" },
  {path: "login", component: LoginComponent, pathMatch: "full"},
  //{path: "inicio", component: InicioComponent, pathMatch: "full", canActivate: [AuthGuard]},
  {path: "inicio", component: InicioComponent, pathMatch: "full"},
  {path: "productos", component: ProductosComponent, pathMatch: "full"},
  {path: "ordenes", component: OrdenesComponent, pathMatch: "full"},
  {path: "usuarios", component: UsuariosComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
