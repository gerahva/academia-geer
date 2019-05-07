import { Component, OnInit } from '@angular/core';
import { Estatus } from "../../modelo/estatus";
import { Globales } from "../../modelo/globales";
import swal from "sweetalert2";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Alumno } from "../../modelo/alumno";
import { Profesor } from "../../modelo/profesor";
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-activar-examen',
  templateUrl: './activar-examen.component.html',
  styleUrls: ['./activar-examen.component.css']
})
export class ActivarExamenComponent implements OnInit {
  materia:string
  bloque:string
  claveAlumno:string
  estaDesactivado=true;
  nombreMateria:string
estatus:Estatus={}
alumno:Alumno={};

  materias = [
    {value: 'inf2', viewValue: 'Informática 2'},
    {value: 'inf4', viewValue: 'Informática 4'},
  
  ];
  bloques = [
    {value: 'diagnostico', viewValue: 'Diagnóstico'},
    {value: 'b1', viewValue: 'Bloque 1'},
    {value: 'b2', viewValue: 'Bloque 2'},
    {value: 'b3', viewValue: 'Bloque 3'},
  
  ];
  constructor(public http:HttpClient, public http2:Http) { }

  ngOnInit() {
  }

buscarAlumno(){
  this.nombreMateria=this.materia+"-"+this.bloque;
  console.log("La materia es "+this.nombreMateria+" La clave del alumno es  "+this.claveAlumno);
  this.http
  .get<Alumno>(Globales.urlBase + "/alumno-clave/"+this.claveAlumno)
  .subscribe(respuesta => {this.alumno = respuesta
    console.log("Mensaje del servidor" + JSON.stringify(this.alumno));
    this.estaDesactivado=false;
  });
setTimeout(() => {

  }, 1500);
}

borrarExamen(){
  this.http
  .get<Estatus>(Globales.urlBase + "/alumno-borrar-examen/"+this.claveAlumno+"/"+this.nombreMateria)
  .subscribe(respuesta => (this.estatus = respuesta));
setTimeout(() => {
  console.log("Mensaje del servidor" + JSON.stringify(this.estatus));
  swal(
    "Examen Activado",
    "Examen activado de "+this.nombreMateria+" para el alumno con clave "+this.claveAlumno ,
    "success"
  );

  }, 1500);
}
revision(){
 // window.location.h= 'http://geducativoedi.com.mx/topa.pdf'

 
  window.open('https://geducativoedi.com.mx/topa.pdf', 'Download');  
  



}

geto(){
  console.log("malo");
  let headers = new HttpHeaders();
  headers = headers.set('Accept', 'application/pdf');
  return this.http.get('https://geducativoedi.com.mx/topa.pdf', { headers: headers, responseType: 'blob' });
}

}
