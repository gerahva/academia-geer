import { Injectable } from '@angular/core';
import { Globales } from '../../modelo/globales';


export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];    
  children?: ChildrenItems[];
}

//Menu para profesores
 let MENUITEMS = [
    {
        state: 'starter',
        name: 'Principal',
        type: 'link',
        icon: 'account_circle'
    }, 
    {
        state: 'material',
        name: 'Contenido',
        type: 'sub',
        icon: 'bubble_chart',
        badge: [
            {type: 'red', value: '7'}
        ],
        children: [
            {state:'perfil',name:'Mi Perfil'},
            {state: 'videos', name: 'Mis Videos'},
            {state:'andamios-profesores',name:'Andamios'},
            {state:'examenes-maestros',name:'Exámenes'},
            {state:'reporte-alumnos',name:'Resultado Diagnóstico'},
            {state:'resultado-bloque1', name:"Resultado Bloque 1"},
            {state:'resultado-bloque2', name:"Resultado Bloque 2"},
            {state:'activar-examen', name:'Activar examenes'}
           // {state:'reporte-general',name:'Reporte General'}
            /*
            {state: 'button', name: 'Buttons'},
            {state: 'cards', name: 'Cards'},
            {state: 'grid', name: 'Grid List'},
            {state: 'lists', name: 'Lists'},
            {state: 'menu', name: 'Menu'},
            {state: 'tabs', name: 'Tabs'},
            {state: 'stepper', name: 'Stepper'},
            {state: 'expansion', name: 'Expansion Panel'},
            {state: 'chips', name: 'Chips'},
            {state: 'toolbar', name: 'Toolbar'},
            {state: 'progress-snipper', name: 'Progress snipper'},
            {state: 'progress', name: 'Progress Bar'},
            {state: 'dialog', name: 'Dialog'},
            {state: 'tooltip', name: 'Tooltip'},
            {state: 'snackbar', name: 'Snackbar'},
            {state: 'slider', name: 'Slider'},
            {state: 'slide-toggle', name: 'Slide Toggle'}    
            
            */
        ]
    } 
];


//Menu para alumnos
let MENUITEMS2 = [
  {
      state: 'starter',
      name: 'Principal',
      type: 'link',
      icon: 'account_circle'
  }, 
  {
      state: 'material',
      name: 'Contenido',
      type: 'sub',
      icon: 'bubble_chart',
      badge: [
          {type: 'red', value: '4'}
      ],
      children: [
       /* {state:'subir-videos',name:'Subir videos2'},  */
          {state:'perfil-alumno',name:'Mi Perfil'},
          {state: 'videos', name: 'Tus videos'},
          {state:'examenes', name:'Tus examenes'},
          {state:'andamios-alumnos',name:'Mis andamios'},
       /*   {state: 'button', name: 'Buttons'}  */
          /*
          {state: 'cards', name: 'Cards'},
          {state: 'grid', name: 'Grid List'},
          {state: 'lists', name: 'Lists'},
          {state: 'menu', name: 'Menu'},
          {state: 'tabs', name: 'Tabs'},
          {state: 'stepper', name: 'Stepper'},
          {state: 'expansion', name: 'Expansion Panel'},
          {state: 'chips', name: 'Chips'},
          {state: 'toolbar', name: 'Toolbar'},
          {state: 'progress-snipper', name: 'Progress snipper'},
          {state: 'progress', name: 'Progress Bar'},
          {state: 'dialog', name: 'Dialog'},
          {state: 'tooltip', name: 'Tooltip'},
          {state: 'snackbar', name: 'Snackbar'},
          {state: 'slider', name: 'Slider'},
          {state: 'slide-toggle', name: 'Slide Toggle'}    
          
          */
      ]
  } 
];

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}

@Injectable()

export class MenuItems2 {
  getMenuitem(): Menu[] {

    if(Globales.esProfesor){
      return MENUITEMS;
    }
    else
    return MENUITEMS2;

    
  }

}
