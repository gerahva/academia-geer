import { Component, OnInit, ViewChild } from '@angular/core';
import { Globales } from '../../modelo/globales';
import { HttpClient } from '@angular/common/http'
import { Alumno } from '../../modelo/alumno';
import { Profesor } from '../../modelo/profesor';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from '../excel.service';
import { ReporteAlumno } from '../../modelo/reporte-alumno';
import { Http, ResponseContentType } from '@angular/http';


@Component({
  selector: 'app-reporte-alumnos',
  templateUrl: './reporte-alumnos.component.html',
  styles: ['reporte.css'],
  providers: [ExcelService]
})
export class ReporteAlumnosComponent implements OnInit {
  profesor: Profesor = {}
  estaCargando=false;
  alumnos: Alumno[] = []
  reporteAlumnos :ReporteAlumno[]=[]

  dataSource = new MatTableDataSource<Alumno>()
  info1 = 'inf1-diagnostico'
  info3 = 'inf3-diagnostico'

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['indice', 'nombreCompleto', 'examenes.nombre', 'examenes.calificacion','clave', 'plantel', 'turno', 'grupo'];

  mostrarGrupo = false
  profesorNombreMateria: string
  constructor(public http: HttpClient,private excelService: ExcelService, public http2:Http) {
    this.profesor = Globales.profesor;
    this.excelService=excelService;
  }

  exportToExcel(event) {
    this.excelService.exportAsExcelFile(this.reporteAlumnos, 'alumnos');
  }
  ngOnInit() {

    
  }


  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  verGrupoInfo(valor: string) {
    this.estaCargando=true;
  this.reporteAlumnos=[];
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
        "/alumno/clave-profesor/" +
        this.profesor.clave +
        "/" +
        valor
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
       
        this.mostrarGrupo = true

        //Llenamos perote alumnos
        this.reporteAlumnos.push({numero:indice,
          nombre:this.alumnos[i].nombreCompleto,
          examen:this.alumnos[i].examenes[0].nombre,
           clave:this.alumnos[i].clave,
          calificacion:this.alumnos[i].examenes[0].calificacion,
           plantel:this.alumnos[i].plantel,
          turno:this.alumnos[i].turno,
          grupo:this.alumnos[i].grupo


        });
         // incrementamos el indice de cada alumno a mostrarse en el ciclo
        indice++;
      }

      console.log('maloooooo ' + JSON.stringify(this.alumnos));
      this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

  this.estaCargando=false;



    }, 1700);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

