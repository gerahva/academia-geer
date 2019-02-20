import { Component, OnInit } from '@angular/core';
import { Estatus } from '../../modelo/estatus';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../../modelo/profesor';
import { Globales } from '../../modelo/globales';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  claveProfesor:string
  email:string
  grupo:number
  password:string
  estaDesactivado=true;

estatus:Estatus={}
profesor:Profesor={};

constructor(public http:HttpClient) {

  this.profesor=Globales.profesor

 this.password=this.profesor.password;
 this.email=this.profesor.email;
 
 }

  ngOnInit() {

  }


 
 
  actualizarProfesor(){

   // console.log("Alumno a actualizar: "+JSON.stringify(this.alumno));

   console.log("La clave es  "+this.password);
   console.log("El email  "+this.email);
   console.log('El pass '+this.password);
   this.profesor.email=this.email;
   this.profesor.password=this.password;
    this.http
    .put<Estatus>(Globales.urlBase + "/profesor-clave",this.profesor )
    .subscribe(respuesta => (this.estatus = respuesta));
  setTimeout(() => {
    console.log("Mensaje del servidor" + JSON.stringify(this.estatus.mensaje));

    swal(
      "Perfil modificado",
      "Perfil atualizado con éxito" ,
      "success"
    );
  
    }, 1500);
  }
  
}
