import { Component, OnInit, ViewChild } from '@angular/core';
import { Estatus } from "../../modelo/estatus";
import { Globales } from "../../modelo/globales";
import swal from "sweetalert2";

import { HttpClient } from "@angular/common/http";

import { Alumno } from "../../modelo/alumno";
import { Profesor } from "../../modelo/profesor";
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {


  claveAlumno:string
  email:string
  grupo:number
  password:string
  estaDesactivado=true;

estatus:Estatus={}
alumno:Alumno={};

constructor(public http:HttpClient) { }

  ngOnInit() {
  }
  buscarAlumno(){

    console.log("La clave es  "+this.claveAlumno);
    //La siguiente URL busca por clave del alumno
    this.http
    .get<Alumno>(Globales.urlBase + "/alumno-clave/"+this.claveAlumno)
    .subscribe(respuesta => (this.alumno = respuesta));
  setTimeout(() => {
    console.log("Mensaje del servidor" + JSON.stringify(this.alumno));
    this.estaDesactivado=false;
  this.email=this.alumno.email;
    this.grupo=this.alumno.grupo;
    this.password=this.alumno.password;
    }, 1500);
  }

  actualizarAlumno(){
    this.alumno.email=this.email;
    this.alumno.grupo=this.grupo;
    this.alumno.password=this.password;
   // console.log("Alumno a actualizar: "+JSON.stringify(this.alumno));


    this.http
    .put<Estatus>(Globales.urlBase + "/alumno-clave",this.alumno )
    .subscribe(respuesta => (this.estatus = respuesta));
  setTimeout(() => {
    console.log("Mensaje del servidor" + JSON.stringify(this.estatus.mensaje));
    this.estaDesactivado=false;
  this.email=this.alumno.email;
    this.grupo=this.alumno.grupo;
    this.password=this.alumno.password;

    swal(
      "Alumno modificado",
      "Perfil del alumno atualizado" ,
      "success"
    );
  
    }, 1500);
  }
  
}
