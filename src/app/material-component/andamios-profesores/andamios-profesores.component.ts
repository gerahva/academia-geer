import { Component, OnInit } from '@angular/core';
import { Globales } from '../../modelo/globales';

@Component({
  selector: 'app-andamios-profesores',
  templateUrl: './andamios-profesores.component.html',
  styles: []
})
export class AndamiosProfesoresComponent implements OnInit {
  andamiosInfo1:any[]
  andamiosInfo3:any[]
  materiaInfo1:string='Informatica 1'
  materiaInfo3:string='Informatica 3'
  constructor() { }

  ngOnInit() {
    this.andamiosInfo1=Globales.inf1_andamios_profesores;
this.andamiosInfo3=Globales.inf3_andamios_profesores;
  }

}
