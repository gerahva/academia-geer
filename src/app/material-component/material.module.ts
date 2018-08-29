import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';

import { DemoMaterialModule} from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { GridComponent } from './grid/grid.component'; 
import { ListsComponent } from './lists/lists.component'; 
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component'; 
import { StepperComponent } from './stepper/stepper.component'; 
import { ExpansionComponent } from './expansion/expansion.component'; 
import { ChipsComponent } from './chips/chips.component'; 
import { ToolbarComponent } from './toolbar/toolbar.component'; 
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component'; 
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent, DialogOverviewExampleDialog } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component'; 
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { FileUploadModule } from 'ng2-file-upload';
import { VideitosComponent } from './videitos/videitos.component';
import { SubirVideosComponent } from './subir-videos/subir-videos.component';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { ExamenesComponent } from './examenes/examenes.component';
import { AndamiosAlumnosComponent } from './andamios-alumnos/andamios-alumnos.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { AndamiosProfesoresComponent } from './andamios-profesores/andamios-profesores.component';
import { ExamenesMaestrosComponent } from './examenes-maestros/examenes-maestros.component';
import { ReporteAlumnosComponent } from './reporte-alumnos/reporte-alumnos.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from "ng2-completer";
//import { DxDataGridModule, DxButtonModule} from 'devextreme-angular';
//import{ DevExtremeModule } from 'devextreme-angular'; 

@NgModule({
  imports: [
    CommonModule,
   // BrowserModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    FileUploadModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
   // DxDataGridModule,
    //DxButtonModule,
   // DevExtremeModule,
    VgCoreModule,VgControlsModule,VgOverlayPlayModule,VgBufferingModule
  ],
  providers: [
    
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],    
  declarations: [
    ButtonsComponent,
    CardsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialog,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    VideitosComponent,
    SubirVideosComponent,
    ExamenesComponent,
    AndamiosAlumnosComponent,
    ProfesoresComponent,
    AndamiosProfesoresComponent,
    ExamenesMaestrosComponent,
    ReporteAlumnosComponent  
  ]
})

export class MaterialComponentsModule {}
