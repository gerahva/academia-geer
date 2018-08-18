import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-subir-videos',
  templateUrl: './subir-videos.component.html',
  styleUrls: ['./subir-videos.component.css']
})
export class SubirVideosComponent implements AfterViewInit{
  public hasBaseDropZoneOver:boolean = false;
  public materia:string="yooo";
  public bloque:string="tuuu";
  public curso:string="eeeel";
  public hasAnotherDropZoneOver:boolean = false;
 //URL = 'http://192.168.100.7:9000/api/archivaldo';
 URL = 'https://node74674-env-8686050.whelastic.net/api/archivaldo';

 public uploader:FileUploader = new FileUploader({url: this.URL});

 materias = [
  {value: 'info1', viewValue: 'Informática 1'},
  {value: 'info3', viewValue: 'Informática 3'},

];
bloques = [
  {value: 'bloque1', viewValue: 'Bloque 1'},
  {value: 'bloque2', viewValue: 'Bloque 2'},
  {value: 'bloque3', viewValue: 'Bloque 3'},
  {value: 'bloque4', viewValue: 'Bloque 4'}
];
cursos = [
  {value: 'excel', viewValue: 'Excel'},
  {value: 'word', viewValue: 'Word'},
  {value: 'internet', viewValue: 'Internet'},
  {value: 'power', viewValue: 'Power Point'},
  {value: 'programacion', viewValue: 'Programación'}
];
 public constructor(){
 
 }
    ngAfterViewInit(){


      this.uploader.onBuildItemForm=(fileItem: any, form: any) => {
        form.append('materia' , this.materia);
        form.append('bloque' , this.bloque);
        form.append('curso' , this.curso);
      
       };
  

    }    
    public fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }
    onFileSelected(){
      
console.log("asas")
    }

   

    public onChange($event:any):void {

      /*
      Con el siguiente codigo podmeos actualizar el form de submicion para que
      acepte el otro prametroa adicional al del file y que llegue al servidor tambien
      y cambien dinamicamente
      *
      this.uploader.onBuildItemForm=(fileItem: any, form: any) => {
        form.append('materia' , this.materia);
        form.append('bloque' , this.bloque);
        form.append('curso' , this.curso);
      
       };
       */
  
      console.log("Se ha seleccionado el archivo  y nombre "+this.materia);
      console.log("url "+this.URL);
    //console.log("yayayayaya"+$event.srcElement.files[0].name);

    }
}
