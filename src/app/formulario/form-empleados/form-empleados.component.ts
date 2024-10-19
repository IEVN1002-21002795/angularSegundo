import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})

export class FormEmpleadosComponent {
  formularioEmpleado: FormGroup;
  empleados: any[] = [];
  tablaVisible = false;
  indiceModificacion: number | null = null;

  constructor(private fb: FormBuilder) {
    this.formularioEmpleado = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      horasTrabajadas: ['', [Validators.required, Validators.min(0)]]
    });

    this.cargarEmpleados();
  }

  agregarEmpleado() {
    const nuevoEmpleado = this.formularioEmpleado.value;
    nuevoEmpleado.sueldo = this.calcularSueldo(nuevoEmpleado.horasTrabajadas);

    if (this.indiceModificacion !== null) {
     
      this.empleados[this.indiceModificacion] = nuevoEmpleado;
      this.indiceModificacion = null; 
    } else {
      
      this.empleados.push(nuevoEmpleado);
    }

    this.guardarEmpleados();
    this.formularioEmpleado.reset();
  }

  mostrarTabla() {
    this.tablaVisible = true;
  }

  modificarEmpleado(index: number) {
    this.formularioEmpleado.patchValue(this.empleados[index]);
    this.indiceModificacion = index; 
  }

  eliminarEmpleado(index: number) {
    this.empleados.splice(index, 1);
    this.guardarEmpleados();
  }

  calcularSueldo(horas: number): number {
    return horas > 40 ? 40 * 70 + (horas - 40) * 140 : horas * 70;
  }

  guardarEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }
}
