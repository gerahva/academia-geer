import { Component, OnInit } from '@angular/core';
import { Globales } from '../modelo/globales';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../modelo/alumno';


@Component({
  selector: 'starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  esProfesor = false
  alumnos: Alumno[] = []
  totales: number

  constructor(public http: HttpClient) {

  }
  ngOnInit(): void {

    if (Globales.esProfesor) {
      console.log("Eres profesor" + Globales.profesor.clave)
      this.esProfesor = true
      this.http.get<Alumno[]>(Globales.urlBase + "/profesor-alumnos-totales/" + Globales.profesor.clave)
        .subscribe(
          res => {
            this.alumnos = res
            console.log('los alumnos ' + this.alumnos.length)
            this.totales = this.alumnos.length
          })

    }
    if (Globales.esAlumno) {
      console.log("Eres alumno")
    }

  }

}
