import { Component, OnInit } from '@angular/core';
import { Globales } from '../../modelo/globales';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {
examenes:any[]
  constructor() {
  }
  ngOnInit() {
    if(Globales.examenesMateriNombre=="Informatica 1")this.examenes=Globales.inf1_examenes;
   
    if(Globales.examenesMateriNombre=="Informatica 3")this.examenes=Globales.inf3_examenes;
   }

  }



