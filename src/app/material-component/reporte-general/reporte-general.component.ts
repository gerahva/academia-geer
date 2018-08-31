import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {HttpClient} from '@angular/common/http'
import { Alumno } from '../../modelo/alumno';
import { Globales } from '../../modelo/globales';
import { Profesor } from '../../modelo/profesor';
import * as XLSX from 'xlsx';


/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];

const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {
 
  alumnos:Alumno[]
  profesor:Profesor

  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor(public http:HttpClient) { 

 // Create 100 users
 const users: UserData[] = [];
 for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

 // Assign the data to the data source for the table to render
 this.dataSource = new MatTableDataSource(users);


 //Buscamos  los alumnos por nombre de la materia  la clave del profesor
 this.http
 .get<Alumno[]>(
   Globales.urlBase +
   "/alumno/lista/" +
   'topoyiyo' +
   "/" +
   'Informatica 1'
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


  },1400);

  
  }

  ngOnInit() {
  }

 /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
