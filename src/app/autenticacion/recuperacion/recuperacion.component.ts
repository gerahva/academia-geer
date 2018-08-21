import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Globales } from '../../modelo/globales';
import { Estatus } from '../../modelo/estatus';
import swal from 'sweetalert2'
@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html'
})
export class RecuperacionComponent implements OnInit {
estatus:Estatus={}
/////
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public http:HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      email: [ null, Validators.compose( [ Validators.required, CustomValidators.email ] ) ]
    } );
  }


  onSubmit() {
console.log("Se enviara a"+this.form.get("email").value);
 let url="https://geradmin.herokuapp.com/api/correo/"+this.form.get("email").value;
 //let url="http://192.168.100.7:9000/api/correo/"+this.form.get("email").value;
    this.http
      .get<Estatus>(url)
      .subscribe(respuesta => {
        this.estatus = respuesta;
      });
    setTimeout(() => {
console.log("se envio a "+this.estatus.mensaje);
swal(
  'Perfecto!',
  'Se te envió tu password a tu email!',
  'success'
)
 this.router.navigate ( ['/login'],{ skipLocationChange: true } );
  },1800);
}

}
