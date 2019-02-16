import { Component, OnInit } from "@angular/core";

import { Estatus } from "../../modelo/estatus";
import { Globales } from "../../modelo/globales";
import { Plantillaexamen } from "../../modelo/plantillaexamen";
import { HttpClient } from "@angular/common/http";
import { Pregunta } from "../../modelo/pregunta";
import { Alumno } from "../../modelo/alumno";
import { Profesor } from "../../modelo/profesor";
import swal from "sweetalert2";
@Component({
  selector: "app-examenes",
  templateUrl: "./examenes.component.html",
  styleUrls: ["./examenes.component.css"]
})
export class ExamenesComponent implements OnInit {
  //El siguiente oculta el catalogo inicial de examen
  mostrarCatalogo: boolean = true;
  //El siguiente muestra e examen cliqueado
  mostrarExamenAcual: boolean = false;

  examenes: any[];
  public examenesMateriaNombre: string;
  public examenesNombre: string;
  public alumno: Alumno = {};

  public alumnos: Alumno[];
  public puedeHacerExamen: boolean;

  public profesor: Profesor = {};

  profesorNombreMateria: string;
  nombreExamenActual: string;

  mostrar: boolean = true;
  ocultarResultado = true;
  sinChecar: boolean = false;
  //Para el titulo del examen

  selectedValue: string;
  public buenas: number = 0;
  public calificacion: number = 0;

  estaExamenDiagnosticoRealizado: boolean = false;
  estaExamenInfo2InternetB2Realizado: boolean = false;
  estaExamenInfo2WordB2Realizado: boolean = false;
  estaExamenInfo2ExcelB2Realizado: boolean = false;
  estaExamenInfo2PowerB2Realizado: boolean = false;
  plantillaexamensito: Plantillaexamen = {};
  examenAEnviar:Plantillaexamen={};

  public preguntas: Pregunta[];
  
  public numeroPreguntas: number;
  public indicePegunta: number = 0;
  public contadorPregunta: number = 1;
  public preguntaActual: Pregunta = {};
  public hayIntroduccion: boolean = false;

  public introduccion: string;

  public estatus: Estatus = {};

  public 

  constructor(public http: HttpClient) {}
  ngOnInit() {
    //Ocultamos el examen inicial antes

    if (Globales.examenesMateriNombre == "Informatica 1")
      this.examenes = Globales.inf1_examenes;

      if (Globales.examenesMateriNombre == "Informatica 2")
      this.examenes = Globales.inf2_examenes; 

    if (Globales.examenesMateriNombre == "Informatica 3")
      this.examenes = Globales.inf3_examenes;
      if (Globales.examenesMateriNombre == "Informatica 4")
      this.examenes = Globales.inf4_examenes;
  }

  

  /***************************************************
 EMPEZAR EXAMEN
**************************************************/

  empezarExamen(id: string) {
    //NOmbre de la materia
    //Limpiamos cuanquiero otro examen si es que lo hay

    this.nombreExamenActual = id;

    console.log("Nombre del examen es " + this.nombreExamenActual);

    //Activamos la visualziación del examen , con las prguntas una a una

    this.mostrarExamenAcual = true;
    //Ocultamos el catalogo
    this.mostrarCatalogo = false;
    //hay
    let x = 2;

    //Checamos el examen
    this.irAExamen();

    let estaUrl: string = Globales.urlBase + "/plantillaexamen/" + id;
    console.log("La es esta  url" + estaUrl);
    this.http.get<Plantillaexamen>(estaUrl).subscribe(respuesta => {
      this.plantillaexamensito = respuesta;
   //Asignamos a la plantilla del examen la variable examernAEnviar para igualarlos
 this.examenAEnviar=respuesta;
      
    });

    setTimeout(() => {
      //Checamos que haya devuelto un examen que no sea null o que este este activo
      if (this.plantillaexamensito == null) {
        this.mostrarCatalogo = true;
        this.puedeHacerExamen = false;

        swal(
          "Examen no activo!",
          "Todavia no está activo este examen",
          "error"
        );
      }

      this.mostrar = false;
      if (this.plantillaexamensito.introduccion != null)
        this.hayIntroduccion = true;

      this.numeroPreguntas = this.plantillaexamensito.preguntas.length;
      this.introduccion = this.plantillaexamensito.introduccion;
      console.log(
        "El nombre del examen a gestionar es " + this.nombreExamenActual
      );
      console.log(
        "El examen tiene son numero " +
          this.plantillaexamensito.preguntas.length
      );
      console.log("El examen es " + JSON.stringify(this.plantillaexamensito));
    }, 1800);
  }

  //Primro checamos si el alumno puede hacer este examen, es decir vemos si ya existe en su ristro
  irAExamen() {
    let alumnito: Alumno = {
      email: Globales.alumno.email,
      password: Globales.alumno.password
    };

    console.log(
      "SE VA A ENVIAR ESTE ALUMNO para examen con passwoprd: " +
        Globales.alumno.password
    );
    this.http
      .post<Alumno>(Globales.urlBase + "/alumno-examen", alumnito)
      .subscribe(respuesta => {
        this.alumno = respuesta;
      });
    setTimeout(() => {
      //  verificamos si el examen diagnosticol está relaizado:

      this.puedeHacerExamen = this.checarSiPuedeHacerExamen(
        this.nombreExamenActual,
        this.alumno
      );
      if (this.plantillaexamensito == null) {
        swal(
          "Examen no activo",
          "Todavía no se puede hacer este examen",
          "error"
        );
      } else if (!this.puedeHacerExamen) {
        this.mostrarCatalogo = true;

        swal("Examen realizado!", "Ya has contestado este examen", "error");
      } else {
        console.log("Puede hacer examen?" + this.puedeHacerExamen);
        this.preguntaActual = this.plantillaexamensito.preguntas[0];
        this.numeroPreguntas = this.plantillaexamensito.preguntas.length;
      }
    }, 1600);
  }

  siguiente() {
    //Checamos antes   si es correcta ANTES DE PASAR A LA OTRA, PERO ANTES VEMOS LA SELECCIONADA Y LA PONEMOS
    //AL EXAMEN examenAEnviar
     
   


    if (
      this.plantillaexamensito.preguntas[this.indicePegunta].opciones[
        this.selectedValue
      ].acierto
    ) {
      console.log("CORRECTA");
      this.buenas++;
    } else console.log("INCORRECTA");


    //AQUI AGREGAMOS A LA PLANTILLA EXAMEN A ENVIAR EL EXMANN QUE ENVIAREMOS


  this.examenAEnviar.preguntas[this.indicePegunta].opciones[this.selectedValue]=  this.plantillaexamensito.preguntas[this.indicePegunta].opciones[
      this.selectedValue
    ]

  

    this.examenAEnviar.preguntas[this.indicePegunta].opciones[this.selectedValue].acierto=true;

    //iNCREMENTAMOS LA OTRA A LA  QUE SE VA A PASAR SIGUIENTE
    this.indicePegunta++;
    console.log("Valor antes de pasar a la otra...." + this.selectedValue);

    this.contadorPregunta++;
    this.selectedValue = null;
    if (this.indicePegunta < this.plantillaexamensito.preguntas.length) {
      this.preguntaActual = this.plantillaexamensito.preguntas[
        this.indicePegunta
      ];
    } else {
      //Ya que no hay mas preguntas!!!???
   //ya esta la clave prepagara del alumno con el id del examen
   //sedssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
      this.examenAEnviar.id=this.plantillaexamensito.id+"-"+this.alumno.clave;


      this.mostrar = true;
      this.ocultarResultado = false;
      this.mostrarExamenAcual = false;

      this.calificacion = (this.buenas / this.indicePegunta) * 10;
      this.alumno.email = Globales.alumno.email;
      this.alumno.password = Globales.alumno.password;

      //MOstramos la calificacion al almnos para que sepa que saco
      swal(
        "Examen: "+ this.nombreExamenActual ,
        "Tu califiación es " + this.calificacion.toFixed(2)+" Clave: "+this.alumno.clave,
        "success"
      );

      this.puedeHacerExamen = false;
      this.plantillaexamensito = null;

      this.alumno.examenes.push({
        materia: {
          nombre: Globales.examenesMateriNombre
        },
        nombre: this.nombreExamenActual,
        calificacion: this.calificacion
      });

      //Hacemos que se muestre el catalogo
      this.mostrarCatalogo = true;

      //Enviamos a travez de http
      this.http
       .post<Estatus>(Globales.urlBase + "/alumno/examen", this.alumno)
       .subscribe(respuesta => (this.estatus = respuesta));


      //Activamos la 
      this.http.post<Estatus>('https://daton.herokuapp.com/api/examenso', this.examenAEnviar).subscribe(res=>{this.estatus=res})
      setTimeout(() => {
        console.log("Mensaje del servidor" + this.estatus.success);
        console.log("EXAMEN A ENVIARSEEEEE  "+JSON.stringify(this.examenAEnviar));

      }, 1600);
    }
  }

  checarSiPuedeHacerExamen(nombre: string, alumno: Alumno): boolean {
    var puede: boolean;
    puede = true;
    console.log(
      "Checar si puede hacer examen de muchos  " + alumno.examenes.length
    );
    for (var exa of alumno.examenes) {
      console.log(
        "Buscando los nombres del exmanes:" + exa.nombre + "para " + nombre
      );

      //Checa si existe el examen, si existe ya no podrá hacer examen
      if (exa.nombre == nombre || this.plantillaexamensito == null) {
        puede = false;
        console.log(
          "Se hayo una coincidencia.." + exa.nombre + " con " + nombre
        );
      }
      console.log("ciclo terminado Estatus de puede o no puede " + puede);
    }
    this.contadorPregunta=1;

    return puede;
  }
}
