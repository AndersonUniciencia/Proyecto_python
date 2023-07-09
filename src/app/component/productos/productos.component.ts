import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  cargando: boolean = true;
  productos: any=[];
  filtros: any;

  constructor(
    private produS: ProductoService
  ) { }

  ngOnInit(): void {
    this.filtros = {nombre: null};
    this.filtrar();
  }

  filtrar(){
    this.cargando = true;

    this.produS.getProductos(this.filtros.nombre).subscribe((res: any)=>{
      this.productos = res;
      this.cargando = false;
    });
  }

}
