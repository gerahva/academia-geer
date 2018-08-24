import { Alumno } from "./alumno";
import { Profesor } from "./profesor";
import { Perfil } from "./perfil";
import { Estatus } from "./estatus";
export class Globales {
  public static alumno: Alumno = {};

  public static alumnos: Alumno[];

  public static profesor: Profesor = {};

public static urlBase:string="https://geradmin.herokuapp.com/api";
 //public static urlBase: string = "http://192.168.100.7:9000/api";
  //TONTOTTTTTTTTTTT

  public static esProfesor: boolean;
  public static esAlumno: boolean;
  public static examenesMateriNombre: string;
  public static examenesNombre: string;

  public static estatus: Estatus;
  public static cargando: boolean;

  public static menus: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Examenes', url: '/dashboard' },
        { titulo: 'Andamios', url: '/progress' },
        { titulo: 'Videos', url: '/graficas1' },

      ]
    }
  ];

  public static inf1_examenes:any=[
   {id:'inf1-diagnostico', nombre:' Inf 1, Diagnóstico'},
   {id:'inf1-b1-internet', nombre:'Info 1, B1, Internet'},
   {id:'inf1-b1-word', nombre:'Info 1, B1, Word' },
   {id:'inf1-b1-excel', nombre: 'Info 1, B1, Excel'},
   {id:'inf1-b1-power', nombre: 'Info 1, B1, Power Point'},

  ]
  public static inf3_examenes:any=[
    {id:'inf3-diagnostico', nombre:'Inf 3 Diagnóstico'},
    {id:'inf3-b1-word', nombre:'Info 3, B1, Word'},
    {id:'inf3-b1-excel', nombre:'Info 3, B1,Word'}
   ]
 
   public static inf3_andamios_alumnos:any=[
    {nombre:'Informática 3 bloque 1', url:"https://geducativoedi.com.mx/andamios/inf3-b1-alumno.zip"},
    {nombre:'Informática 3 bloque 2', url:"https://geducativoedi.com.mx/andamios/inf3-b2-alumno.zip"},
    {nombre:'Informática 3 bloque 3', url:"https://geducativoedi.com.mx/andamios/inf3-b3-alumno.zip"}
   ]

 
   public static inf1_andamios_alumnos:any=[
    {nombre:'Informática 1 bloque 1', url:"https://geducativoedi.com.mx/andamios/inf1-b1-alumno.zip"},
    {nombre:'Informática 1 bloque 2', url:"https://geducativoedi.com.mx/andamios/inf1-b2-alumno.zip"},
    {nombre:'Informática 1 bloque 3', url:"https://geducativoedi.com.mx/andamios/inf1-b3-alumno.zip"}
   ]

   public static inf1_andamios_profesores:any=[
    {nombre:'Informática 1 bloque 1', url:"https://geducativoedi.com.mx/andamios/inf1-b1-profesor.zip"},
    {nombre:'Informática 1 bloque 2', url:"https://geducativoedi.com.mx/andamios/inf1-b2-profesor.zip"},
    {nombre:'Informática 1 bloque 3', url:"https://geducativoedi.com.mx/andamios/inf1-b3-profesor.zip"}
   ]
   public static inf3_andamios_profesores:any=[
    {nombre:'Informática 3 bloque 1', url:"https://geducativoedi.com.mx/andamios/inf3-b1-profesor.zip"},
    {nombre:'Informática 3 bloque 2', url:"https://geducativoedi.com.mx/andamios/inf3-b2-profesor.zip"},
    {nombre:'Informática 3 bloque 3', url:"https://geducativoedi.com.mx/andamios/inf3-b3-profesor.zip"}
   ]

    
  }

