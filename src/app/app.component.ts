import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterOutlet } from '@angular/router';
import { Ejemplo1Component } from "./formulario/ejemplo1/ejemplo1.component";
import { ZodiacoComponent } from './formulario/trabajo1/zodiaco/zodiaco.component';
import { FormEmpleadosComponent } from './formulario/form-empleados/form-empleados.component';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Ejemplo1Component, ZodiacoComponent, FormEmpleadosComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularSegundo';
 
  mostrarEjemplo1 = false;
  mostrarZodiaco = false;
  mostrarFormEmpleados = false; 
 
  mostrarComponente(componente: string) {
    this.mostrarEjemplo1 = componente === 'ejemplo1';
    this.mostrarZodiaco = componente === 'zodiaco';
    this.mostrarFormEmpleados = componente === 'form-empleados'
  }
}