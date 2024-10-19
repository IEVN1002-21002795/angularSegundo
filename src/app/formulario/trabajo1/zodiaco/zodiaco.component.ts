import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent implements OnInit {
  formulario!: FormGroup;
  resultado: string = '';
  imagenSigno: string = '';
  dia: any;
  mes: any;
  anio: any;
  edad: number | undefined;

  constructor() {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidop: new FormControl('', Validators.required),
      apellidom: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required)
    });
  }

  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
  
    if (
        hoy.getMonth() < fechaNacimiento.getMonth() ||
        (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate()) ||
        (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() === fechaNacimiento.getDate() && hoy.getHours() < fechaNacimiento.getHours())
    ) {
        edad--;
    }

    return edad;
}

  calcularZodiacoChino(anio: number): { signo: string, imagenUrl: string } {
    const signosChinos = [
      { signo: 'Rata', imagenUrl: 'https://i.pinimg.com/564x/b2/af/11/b2af11acbc9e39717346ab83ab381846.jpg' },
      { signo: 'Buey', imagenUrl: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg' },
      { signo: 'Tigre', imagenUrl: 'https://i.pinimg.com/564x/7b/31/ee/7b31ee76454c7c512572dd9a322c0f2d.jpg' },
      { signo: 'Conejo', imagenUrl: 'https://i.pinimg.com/enabled/564x/2c/f1/26/2cf126e7f7eb0c5c5df0d795f4531142.jpg' },
      { signo: 'Dragón', imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCY6i3Hwb2td_X84xj6vF6qTXjTl-qpIykSg&s' },
      { signo: 'Serpiente', imagenUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpeopleenespanol.com%2Fhoroscopo%2Fpredicciones-horoscopo-chino-2023-serpiente%2F&psig=AOvVaw0WU4A4soqXvjiUzT-wC9ad&ust=1729390459977000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJi4itKvmYkDFQAAAAAdAAAAABAE' },
      { signo: 'Caballo', imagenUrl: 'https://i.pinimg.com/736x/7f/7a/e7/7f7ae71f2db4b8fd98d954980d7b6928.jpg' },
      { signo: 'Cabra', imagenUrl: 'https://peopleenespanol.com/thmb/Fwy99mIonHJYbhmA9AOTeWCpkdU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165967741-2000-12afb4d370f14afe856f05ba36fe1693.jpg' },
      { signo: 'Mono', imagenUrl: 'https://i.pinimg.com/736x/b0/7c/a2/b07ca2fd82b9fc20ab4900b6a996ab9b.jpg' },
      { signo: 'Gallo', imagenUrl: 'https://i.pinimg.com/564x/19/9d/12/199d1259671ed4ef602085312037768f.jpg' },
      { signo: 'Perro', imagenUrl: 'https://i.pinimg.com/564x/0f/c7/6f/0fc76f4915235ecc68b11131dcd0da37.jpg' },
      { signo: 'Cerdo', imagenUrl: 'https://i.pinimg.com/564x/b8/64/09/b86409d51b9e544a18d4d56e66f6ad6e.jpg' }
    ];
    const indice = (anio - 1900) % 12;
    return signosChinos[indice];
  }

  imprimirResultado(): void {
    if (this.formulario.valid) {
      const fechaNacimiento = new Date(this.formulario.get('fechaNacimiento')?.value);
      const anioNacimiento = fechaNacimiento.getFullYear();
      const edad = this.calcularEdad(fechaNacimiento);
      const { signo, imagenUrl } = this.calcularZodiacoChino(anioNacimiento);

      this.resultado = `Hola ${this.formulario.get('nombre')?.value} ${this.formulario.get('apellidop')?.value} ${this.formulario.get('apellidom')?.value}, tienes ${edad} años y tu signo zodiacal chino es ${signo}.`;
      this.imagenSigno = imagenUrl;
    }
  }
}
