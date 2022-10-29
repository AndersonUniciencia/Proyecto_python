import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import * as _ from "underscore";

@Injectable({
  providedIn: 'root'
})
export class InterseptorServiceService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = sessionStorage.getItem("token");
    var request = req;

    console.log(req);

    if(token){
      request = req.clone({
        setHeaders:{
          authorization: "Bearer " + token,
        }
      })
    }

    return next.handle(request).pipe(map((event: any) => {
      if (event instanceof HttpResponse)
          event = event.clone({body: this.getToken(event.headers)});

      if(event instanceof HttpResponse)
        event = event.clone({body: this.getRespuesta(event.body)});

      return event;
    }//, catchError((err: HttpErrorResponse) => {

    //})
    ));
  }

  private getToken(headers: any){
      var token = headers.token;

      if(token)
        sessionStorage.setItem("token", token);

  }

  private getRespuesta(body: any){
    console.log(body);
    var error = body.error;

    if(error.detail == "No pudo validar las credenciales" ){
      sessionStorage.clear();
      this.router.navigate(['']);
    }
  }
}
