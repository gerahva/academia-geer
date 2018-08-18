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

    if(Globales.examenesMateriNombre=="Informatica 1"){
      this.andamios=Globales.inf1_andamios_alumnos;
      this.materia="Informática 1"
    }
    if(Globales.examenesMateriNombre=="Informatica 3"){
      this.andamios=Globales.inf3_andamios_alumnos;
      this.materia="Informática 3"
    }
  }

}
