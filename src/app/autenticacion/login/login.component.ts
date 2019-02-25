import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Profesor } from '../../modelo/profesor';
import { Alumno } from '../../modelo/alumno';
import { Estatus } from '../../modelo/estatus';
import { Globales } from '../../modelo/globales';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
//Para ocultar mostrar password
hide=true

  perfil: string
  login: string;
  password: string;
  estaOculta: boolean = true;
  mensaje: string = "nada";
  profesor: Profesor;
  email: string;
  miMateria: string;
  miClaveProfesor: string;
  oculta: boolean;
  usuario: string = 'Selecciona uno...';
  mostrar: boolean;
  urlAutenticacion: string;
  usuarioInvalido = 'Usuario o contraseña inválidos, si no la recuerdas proporciona tu correo para enviartela y oprimer el boton -Recuperar Contraseña- '

  alumno: Alumno = {};
  estatus: Estatus = {};
  mostrarError: boolean = false;
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      login: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    console.log("has hecho click" + JSON.stringify(this.form.value));
    console.log("El perfil " + this.perfil)

    //Checamos si es alumno o preofesor

    if (this.perfil == "Profesor") {
      console.log("Te autenticaras como profesor");

      this.profesor = {
        email: this.form.get("login").value,
        password: this.form.get("password").value
      };

      this.urlAutenticacion = Globales.urlBase + "/autenticar/profesor";
      this.http
        .post<Estatus>(this.urlAutenticacion, this.profesor)
        .subscribe(respuesta => {
          this.estatus = respuesta;
        });
      setTimeout(() => {
        this.oculta = false;
        console.log(this.estatus.mensaje + " Estatus " + this.estatus.success);
        if (this.estatus.success) {
          //Si se autentica como profesor
          Globales.esProfesor = true;
          this.mostrarError = false;
          Globales.profesor = this.profesor;
          Globales.esAlumno = false;
          Globales.profesor.clave = this.estatus.perfil.clave;
          console.log("Este profesor: "+JSON.stringify(this.estatus));
          this.router.navigate(["/starter"], { skipLocationChange: true })

        }else{
          this.estatus.mensaje;
          this.mostrarError=true;
        }
      },1200);
    }
    /* ************************************************************************
    AUTENTCION ALUMNOS
    *********************************************************************** 
    */
    else if (this.perfil == "Alumno") {
      this.mostrarError = false;
      console.log("Inicia autenticacion alumno..")
      this.alumno = {
        email: this.form.get("login").value,
        password: this.form.get("password").value
      };

      this.urlAutenticacion = Globales.urlBase + "/autenticar/alumno";
      this.http
        .post<Estatus>(this.urlAutenticacion, this.alumno)
        .subscribe(respuesta => {
          this.estatus = respuesta;
        });

      setTimeout(() => {
        this.oculta = false;
        console.log(this.estatus.mensaje + " Estatus " + this.estatus.success);
        if (this.estatus.success) {

          //Si se autentica:
          Globales.alumno = this.alumno;
          Globales.alumno.clave = this.estatus.perfil.clave;
          Globales.examenesMateriNombre=this.estatus.perfil.materiaNombre;

      console.log("Autenticado como alumno "+JSON.stringify(this.estatus));
      console.log("Alumno materia "+Globales.examenesMateriNombre);
          //El paso importante la clave

          this.router.navigate(["/starter"], { skipLocationChange: true });
          this.estaOculta = true;
          //Como no es profesor...
          Globales.esProfesor = false;
          Globales.esAlumno = true;
     //Ahora accederemos al perfil
          Globales.estatus = this.estatus;

        }else{
          this.mostrarError=true;
          console.log(this.estatus.mensaje);
        }
      },1200);


    }else{
      this.mostrarError=true;
    }
    
  }

  recuperar(){
    this.router.navigate(["/recuperar"], { skipLocationChange: true });
  }

}
