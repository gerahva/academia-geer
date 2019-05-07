import { Component, OnInit, ViewChild } from "@angular/core";
import { ExcelService } from "../excel.service";
import { Profesor } from "../../modelo/profesor";
import { Alumno } from "../../modelo/alumno";
import { ReporteAlumno } from "../../modelo/reporte-alumno";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

import { Globales } from "../../modelo/globales";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-resultado-bloque1",
  templateUrl: "./resultado-bloque1.component.html",
  styleUrls: ["./resultado-bloque1.component.css"],
  providers: [ExcelService]
})
export class ResultadoBloque1Component implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  profesor: Profesor = {};
  alumnos: Alumno[] = [];
  reporteAlumnos: ReporteAlumno[] = [];
  displayedColumns: any[];
  dataSource = new MatTableDataSource<Alumno>();
  info1 = "inf1-b1";
  info3 = "inf3-b1";

  info2 = "inf2-b1";
  info4 = "inf4-b1";
  estaCargando = false;
  mostrarGrupo = false;
  profesorNombreMateria: string;
  constructor(public http: HttpClient, private excelService: ExcelService) {
    this.profesor = Globales.profesor;
    this.excelService = excelService;
    this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
  }

  exportToExcel(event) {
    

    this.excelService.exportAsExcelFile(this.reporteAlumnos, "alumnos");
  }
  ngOnInit() {}

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if(this.dataSource!=null){
      this.dataSource.filter=filterValue

      


    }

  //  
  }
  verGrupoInfo(valor: string) {
    this.reporteAlumnos = [];
    this.estaCargando = true;
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
          this.alumnos[i].nombreCompleto =
            this.alumnos[i].paterno +
            " " +
            this.alumnos[i].materno +
            " " +
            this.alumnos[i].nombre;
  
          this.mostrarGrupo = true;
          let nombreExamenBuscado = "";
  
          let valorCalif;
  
          //MY IMPORTANTE!!!! CHECAMOS EL NOMBRE DEL EXAMEN ANTES D AGREGARLO:
          for (let examen of this.alumnos[i].examenes) {
            if (examen.nombre == valor) {
              nombreExamenBuscado = valor;
              valorCalif = examen.calificacion;
            }
          }
  
          //Llenamos perote alumnos
          this.reporteAlumnos.push({
            numero: indice,
            nombre: this.alumnos[i].nombreCompleto,
            examen: this.alumnos[i].examenes[0].nombre,
            clave: this.alumnos[i].clave,
            calificacion: this.alumnos[i].examenes[0].calificacion,
            plantel: this.alumnos[i].plantel,
            turno: this.alumnos[i].turno,
            grupo: this.alumnos[i].grupo
          });
          // incrementamos el indice de cada alumno a mostrarse en el ciclo
          indice++;
        }
  
        console.log("maloooooo " + JSON.stringify(this.alumnos));
        this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
         this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns = [
          "indice",
          "nombreCompleto",
          "examenes.nombre",
          "examenes.calificacion",
          "clave",
          "plantel",
          "turno",
          "grupo"
        ];
        this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
         this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.estaCargando = false;
      


      });
    
  }
}
