import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http'
import { MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


import { AutenticacionRoutes } from './autenticacacion.routing';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AutenticacionRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    [SweetAlert2Module.forRoot()]
  ],
  declarations: []
})

export class AutenticionModule {}
