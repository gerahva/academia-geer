import { Component, OnInit } from '@angular/core';
import { Globales } from '../../modelo/globales';

@Component({
  selector: 'app-andamios-alumnos',
  templateUrl: './andamios-alumnos.component.html',
  styles: []
})
export class AndamiosAlumnosComponent implements OnInit {
andamios:any[]
materia:string
  constructor() { }

  ngOnInit() {

    if(Globales.examenesMateriNombre=="Informatica 2"){
      this.andamios=Globales.inf2_andamios_alumnos;
      this.materia="Informática 2"
    }
    if(Globales.examenesMateriNombre=="Informatica 4"){
      this.andamios=Globales.inf4_andamios_alumnos;
      this.materia="Informática 4"
    }
  }

}
