import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';

export const AutenticacionRoutes: Routes = [
  {
    path: '',
    children: [ {
      path: 'login',
      component: LoginComponent
    },
  {
    path:'recuperar',
    component:RecuperacionComponent
  }]
  }
];
