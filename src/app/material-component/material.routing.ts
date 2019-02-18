import { Routes } from "@angular/router";

import { ButtonsComponent } from "./buttons/buttons.component";
import { CardsComponent } from "./cards/cards.component";
import { GridComponent } from "./grid/grid.component";
import { ListsComponent } from "./lists/lists.component";
import { MenuComponent } from "./menu/menu.component";
import { TabsComponent } from "./tabs/tabs.component";
import { StepperComponent } from "./stepper/stepper.component";
import { ExpansionComponent } from "./expansion/expansion.component";
import { ChipsComponent } from "./chips/chips.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ProgressSnipperComponent } from "./progress-snipper/progress-snipper.component";
import { ProgressComponent } from "./progress/progress.component";
import { DialogComponent } from "./dialog/dialog.component";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { SliderComponent } from "./slider/slider.component";
import { SlideToggleComponent } from "./slide-toggle/slide-toggle.component";
import { VideitosComponent } from "./videitos/videitos.component";
import { SubirVideosComponent } from "./subir-videos/subir-videos.component";
import { ExamenesComponent } from "./examenes/examenes.component";
import { AndamiosAlumnosComponent } from "./andamios-alumnos/andamios-alumnos.component";
import { AndamiosProfesoresComponent } from "./andamios-profesores/andamios-profesores.component";
import { ExamenesMaestrosComponent } from "./examenes-maestros/examenes-maestros.component";
import { ReporteAlumnosComponent } from "./reporte-alumnos/reporte-alumnos.component";
import { ReporteGeneralComponent } from "./reporte-general/reporte-general.component";
import { ResultadoBloque1Component } from "./resultado-bloque1/resultado-bloque1.component";
import { ActivarExamenComponent } from "./activar-examen/activar-examen.component";
import { ResultadoBloque2Component } from "./resultado-bloque2/resultado-bloque2.component";
import { MiPerfilComponent } from "./mi-perfil/mi-perfil.component";
import { PerfilAlumnoComponent } from "./perfil-alumno/perfil-alumno.component";

import { ReporteAlumnosGeneralComponent } from "./reporte-alumnos-general/reporte-alumnos-general.component";
import { AndamiosProfesoralumnoComponent } from "./andamios-profesoralumno/andamios-profesoralumno.component";

import { ResultadoBloque3Component } from "./resultado-bloque3/resultado-bloque3.component";
import { ReactivosComponent } from "./reactivos/reactivos.component";


export const MaterialRoutes: Routes = [
  {
    path: "",
    children: [

 {
   path:'perfil',
   component:MiPerfilComponent

 },
 {
  path:'perfil-alumno',
  component:PerfilAlumnoComponent
 },

      {
        path: "reporte-general",
        component: ReporteGeneralComponent
      },
      {
       path:'reactivos',
       component:ReactivosComponent
      },
      {
        path:'alumnos-alta',
        component:ReporteAlumnosGeneralComponent
      },

      {
        path: "resultado-bloque1",
        component: ResultadoBloque1Component
      },
      {
        path: "resultado-bloque2",
        component: ResultadoBloque2Component
      },
      {
      path:'resultado-bloque3',
      component:ResultadoBloque3Component
      },

      {
        path: "reporte-alumnos",
        component: ReporteAlumnosComponent
      },
      {
        path: "subir-videos",
        component: SubirVideosComponent
      },
      {
        path: "examenes",
        component: ExamenesComponent
      },
      {
        path: "videos",
        component: VideitosComponent
      },
      {
        path: "andamios-alumnos",
        component: AndamiosAlumnosComponent
      },
      {
     path:'andamios-profesoralumnos',
     component:AndamiosProfesoralumnoComponent
      },
      {
        path: "andamios-profesores",
        component: AndamiosProfesoresComponent
      },

      {
        path: "examenes-maestros",
        component: ExamenesMaestrosComponent
      },

      {
        path: "activar-examen",
        component: ActivarExamenComponent
      },
      {
        path: "button",
        component: ButtonsComponent
      },
      {
        path: "cards",
        component: CardsComponent
      },
      {
        path: "grid",
        component: GridComponent
      },
      {
        path: "lists",
        component: ListsComponent
      },
      {
        path: "menu",
        component: MenuComponent
      },
      {
        path: "tabs",
        component: TabsComponent
      },
      {
        path: "stepper",
        component: StepperComponent
      },
      {
        path: "expansion",
        component: ExpansionComponent
      },
      {
        path: "chips",
        component: ChipsComponent
      },
      {
        path: "toolbar",
        component: ToolbarComponent
      },
      {
        path: "progress-snipper",
        component: ProgressSnipperComponent
      },
      {
        path: "progress",
        component: ProgressComponent
      },
      {
        path: "dialog",
        component: DialogComponent
      },
      {
        path: "tooltip",
        component: TooltipComponent
      },
      {
        path: "snackbar",
        component: SnackbarComponent
      },
      {
        path: "slider",
        component: SliderComponent
      },
      {
        path: "slide-toggle",
        component: SlideToggleComponent
      }
    ]
  }
];
