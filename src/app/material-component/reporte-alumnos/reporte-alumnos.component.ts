import { Component, OnInit, ViewChild } from '@angular/core';
import { Globales } from '../../modelo/globales';
import { HttpClient } from '@angular/common/http'
import { Alumno } from '../../modelo/alumno';
import { Profesor } from '../../modelo/profesor';
import { MatTableDataSource, MatSort } from '@angular/material';



@Component({
  selector: 'app-reporte-alumnos',
  templateUrl: './reporte-alumnos.component.html',
  styles: ['reporte.css']
})
export class ReporteAlumnosComponent implements OnInit {
  profesor: Profesor = {}
  alumnos: Alumno[] = []
  displayedColumns: any[]
  dataSource = new MatTableDataSource<Alumno>()
  info1 = 'Informatica 1'
  info3 = 'Informatica 3'

  mostrarGrupo = false
  profesorNombreMateria: string
  constructor(public http: HttpClient) {
    this.profesor = Globales.profesor;

  }

  ngOnInit() {
  }

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  verGrupoInfo(valor: string) {
    //  valor='Informatica 1'
    this.profesorNombreMateria = valor;
    console.log(
      "EL GRUPO ES " +
      valor +
      " Correspondiente al maestro cuya clave es  " +
      this.profesor.clave
    );

    //Buscamos  los alumnos por nombre de la materia  la clave del profesor
    this.http
      .get<Alumno[]>(
        Globales.urlBase +
        "/alumno/lista/" +
        this.profesor.clave +
        "/" +
        this.profesorNombreMateria
      )
      .subscribe(respuesta => {
        this.alumnos = respuesta;
      });
    setTimeout(() => {
      console.log(
        "Los alumnos que llegaron para el listado son" +
        JSON.stringify(this.alumnos)
        
      );

      //Ajustamos a las globales a los alumnos
      Globales.alumnos = this.alumnos;

      //Ocultamos el boton de empezar hasta que se cargue el esquema compelto de este alumno

      //MOstramos los grupos
      let indice = 1;
      //this.alumnos=Globales.alumnos;
      for (let i = 0; i < this.alumnos.length; i++) {
        this.alumnos[i].indice = indice;
        this.alumnos[i].nombreCompleto = this.alumnos[i].paterno + " " + this.alumnos[i].materno + " " + this.alumnos[i].nombre;
        indice++;
        this.mostrarGrupo = true
      }

      console.log('maloooooo ' + JSON.stringify(this.alumnos));
      this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
      this.dataSource.sort = this.sort;
      this.displayedColumns = ['indice', 'nombreCompleto', 'examenes.nombre', 'examenes.calificacion', 'plantel', 'turno', 'grupo'];




    }, 1300);
  }
}

