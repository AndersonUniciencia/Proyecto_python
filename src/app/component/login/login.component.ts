import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  version: any;
  cargando: boolean = false;

  constructor(
    private usuarioS: UsuarioService,
    private router: Router
  ) {
    this.user = {email: null, clave: null};
  }

  ngOnInit(): void {
    this.usuarioS.ping().subscribe((response)=>{
      console.log(response);
    });
  }

  ingresar(): void{
    var usuario = this.user;

    if(!(usuario.email || usuario.password)){
      console.log("Error datos faltantes");
      return;
    }
    this.cargando = true;

    this.usuarioS.login(this.user).subscribe((res: any)=>{
      var data = res;
      this.cargando = false;

      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("usuario", JSON.stringify(usuario));

      this.router.navigate(['']);
    });
  }

}
