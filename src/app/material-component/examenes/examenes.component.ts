import { Component, OnInit } from '@angular/core';

import { Estatus } from '../../modelo/estatus';
import { Globales } from '../../modelo/globales';
import { Plantillaexamen } from '../../modelo/plantillaexamen';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../../modelo/pregunta';
import { Alumno } from '../../modelo/alumno';
import { Profesor } from '../../modelo/profesor';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {
  //El siguiente oculta el catalogo inicial de examen 
  mostrarCatalogo:boolean=true;
  //El siguiente muestra e examen cliqueado
mostrarExamenAcual:boolean=false;

examenes:any[]
public examenesMateriaNombre: string;
public examenesNombre: string;
public alumno: Alumno = {};

public alumnos: Alumno[];

public profesor: Profesor = {};

profesorNombreMateria: string;
nombreExamenActual:string;




mostrar:boolean=true;
ocultarResultado=true;
sinChecar:boolean=false;
//Para el titulo del examen

selectedValue: string;
public buenas:number=0;
public calificacion:number=0;

estaExamenDiagnosticoRealizado: boolean = false;
estaExamenInfo2InternetB2Realizado: boolean = false;
estaExamenInfo2WordB2Realizado:boolean=false;
estaExamenInfo2ExcelB2Realizado:boolean=false;
estaExamenInfo2PowerB2Realizado:boolean=false;
plantillaexamensito:Plantillaexamen={

}

public preguntas:Pregunta[];
public numeroPreguntas:number;
 public  indicePegunta:number=0;
 public contadorPregunta:number=1;
 public preguntaActual:Pregunta={

 }
 public hayIntroduccion:boolean=false;

 public introduccion:string;

 public estatus:Estatus={

 }


  constructor(public http:HttpClient) {
  }
  ngOnInit() {

    //Ocultamos el examen inicial antes
 
    if(Globales.examenesMateriNombre=="Informatica 1")this.examenes=Globales.inf1_examenes;
   
    if(Globales.examenesMateriNombre=="Informatica 3")this.examenes=Globales.inf3_examenes;
   }



   empezarExamen(indice:number){
     //NOmbre de la materia

     this.examenesMateriaNombre=Globales.examenesMateriNombre;
     this.nombreExamenActual=this.examenes[indice].nombre;
     console.log("Nombre de la materia "+this.examenesMateriaNombre);
    console.log("Nombre del examen "+this.examenes[indice].nombre);

    //Activamos la visualziación del examen , con las prguntas una a una

    this.mostrarExamenAcual=true;
    //Ocultamos el catalogo
    this.mostrarCatalogo=false;
    //hay 
    let x=2;

   //Checamos el examen
   this.irAExamen();

   let  estaUrl:string=Globales.urlBase+"/plantillaexamen/"+
    this.examenesMateriaNombre+"/"+this.examenes[indice].nombre;
    console.log("La es esta  url"+estaUrl);
    this.http.get<Plantillaexamen>(estaUrl).subscribe(respuesta =>
       { this.plantillaexamensito = respuesta });


       
    setTimeout(() => {

     console.log("Hay que miedosoooo preguntaaas"+JSON.stringify(this.plantillaexamensito));

   
        this.mostrar=false;
        if(this.plantillaexamensito.introduccion!=null) this.hayIntroduccion=true;

      this.preguntaActual=this.plantillaexamensito.preguntas[0];
      this.numeroPreguntas=this.plantillaexamensito.preguntas.length;
     this.introduccion= this.plantillaexamensito.introduccion;
     console.log("Estya es la introduccionj "+this.plantillaexamensito.introduccion);

    
      
    }, 1000);

    
  }




   irAExamen(){
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
    
      console.log(JSON.stringify(this.alumno));
      this.examenesMateriaNombre = this.alumno.examenes[0].materia.nombre;
      this.examenesNombre = this.alumno.examenes[0].nombre;

      //  verificamos si el examen diagnosticol está relaizado:
      console.log(
        "Esta el examen diagnostico realizado?" +
        this.alumno.examenes[0].realizado
      );

      this.estaExamenDiagnosticoRealizado = this.alumno.examenes[0].realizado;
     // this.estaExamenInfo2InternetB2Realizado = this.alumno.examenes[1].realizado;
     // this.estaExamenInfo2WordB2Realizado = this.alumno.examenes[2].realizado;
     // this.estaExamenInfo2ExcelB2Realizado = this.alumno.examenes[3].realizado;
    //  this.estaExamenInfo2PowerB2Realizado = this.alumno.examenes[4].realizado;
    }, 600);
   }

   siguiente(){
    //Checamos antes   si es correcta ANTES DE PASAR A LA OTRA
  if(this.plantillaexamensito.preguntas[this.indicePegunta].opciones[this.selectedValue].acierto){
    console.log("CORRECTA");
    this.buenas++;
  }
   else console.log("INCORRECTA");
//iNCREMENTAMOS LA OTRA A LA  QUE SE VA A PASAR SIGUIENTE
    this.indicePegunta++;
    console.log("Valor antes de pasar a la otra...."+this.selectedValue);

    this.contadorPregunta++;
    this.selectedValue = null; 
    if(this.indicePegunta<this.plantillaexamensito.preguntas.length){
   
    this.preguntaActual=this.plantillaexamensito.preguntas[this.indicePegunta];
    }else{

      //Ya que no hay mas preguntas!!!???
      this.mostrar=true;
      this.ocultarResultado=false;
      this.mostrarExamenAcual=false;
 
      this.calificacion=(this.buenas/this.indicePegunta)*10;
      this.alumno.email=Globales.alumno.email;
      this.alumno.password=Globales.alumno.password;


      this.alumno={
   email:Globales.alumno.email,
   password:Globales.alumno.password,
   examenes:[
     {
      
        "materia": {
            "nombre":this.examenesMateriaNombre
        },
        "nombre":this.nombreExamenActual,
        "calificacion": this.calificacion,
     }
   ]
      }
      //Enviamos a travez de http
      this.http.post<Estatus>(Globales.urlBase+'/alumno/examen', this.alumno).subscribe(respuesta=>this.estatus=respuesta)
      setTimeout(() => { console.log("Mensaje del servidor"+this.estatus.success)},1200)

    }

    

  }
  
  checarRespuesta() {
  //  this.oculta = false;
  }


  }



