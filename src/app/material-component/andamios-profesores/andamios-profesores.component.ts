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
  andamiosInfo2:any[]
  andamiosInfo4:any[]
  materiaInfo2:string='Informatica 2'
  materiaInfo4:string='Informatica 4'
  constructor() { }

  ngOnInit() {
    this.andamiosInfo2=Globales.inf2_andamios_profesores;
this.andamiosInfo4=Globales.inf4_andamios_profesores;
  }

}
