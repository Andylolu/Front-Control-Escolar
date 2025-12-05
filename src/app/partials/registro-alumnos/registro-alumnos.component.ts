import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnoComponent implements OnInit {

  @Input() rol: string = "alumno";
  @Input() datos_user: any = {};

  public alumno: any = {};
  public errors: any = {};
  public editar: boolean = false;

  // Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alumno = this.esquemaAlumno();
    this.alumno.rol = this.rol;
    console.log("Datos alumno: ", this.alumno);
  }

  // Esquema del alumno
  public esquemaAlumno(): any {
    return {
      matricula: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: '',
      curp: '',
      rfc: '',
      edad: null,
      telefono: '',
      ocupacion: '',
      rol: 'alumno'
    };
  }

  // Funciones para password
  public showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    } else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    } else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar() {
    this.location.back();
  }

  public registrar() {
    this.errors = {};
    this.errors = this.validarAlumno(this.alumno, this.editar);
    
    if (Object.keys(this.errors).length > 0) {
      return false;
    }
    
    console.log("Pasó la validación");
    console.log("Datos del alumno:", this.alumno);
    // TODO: Aquí va la lógica para registrar al alumno
  }

  public actualizar() {
    this.errors = {};
    this.errors = this.validarAlumno(this.alumno, this.editar);
    
    if (Object.keys(this.errors).length > 0) {
      return false;
    }
    
    console.log("Actualizando alumno");
    // TODO: Aquí va la lógica para actualizar al alumno
  }

  // Validación del alumno
  public validarAlumno(data: any, editar: boolean): any {
    let errors: any = {};
    
    // Validar matrícula
    if (!data.matricula || data.matricula.trim() === '') {
      errors.matricula = 'La matrícula es requerida';
    }
    
    // Validar nombre
    if (!data.first_name || data.first_name.trim() === '') {
      errors.first_name = 'El nombre es requerido';
    } else if (data.first_name.length < 2) {
      errors.first_name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    // Validar apellidos
    if (!data.last_name || data.last_name.trim() === '') {
      errors.last_name = 'Los apellidos son requeridos';
    } else if (data.last_name.length < 2) {
      errors.last_name = 'Los apellidos deben tener al menos 2 caracteres';
    }
    
    // Validar email
    if (!data.email || data.email.trim() === '') {
      errors.email = 'El correo electrónico es requerido';
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(data.email)) {
        errors.email = 'El formato del correo no es válido';
      }
    }
    
    // Validar contraseña (solo si no está editando)
    if (!editar) {
      if (!data.password || data.password.trim() === '') {
        errors.password = 'La contraseña es requerida';
      } else if (data.password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres';
      }
      
      if (!data.confirmar_password || data.confirmar_password.trim() === '') {
        errors.confirmar_password = 'Debes confirmar la contraseña';
      } else if (data.password !== data.confirmar_password) {
        errors.confirmar_password = 'Las contraseñas no coinciden';
      }
    }
    
    // Validar fecha de nacimiento
    if (!data.fecha_nacimiento) {
      errors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
    }
    
    // Validar CURP
    if (!data.curp || data.curp.trim() === '') {
      errors.curp = 'El CURP es requerido';
    } else if (data.curp.length !== 18) {
      errors.curp = 'El CURP debe tener exactamente 18 caracteres';
    }
    
    // Validar RFC
    if (!data.rfc || data.rfc.trim() === '') {
      errors.rfc = 'El RFC es requerido';
    } else if (data.rfc.length < 12 || data.rfc.length > 13) {
      errors.rfc = 'El RFC debe tener entre 12 y 13 caracteres';
    }
    
    // Validar edad
    if (!data.edad) {
      errors.edad = 'La edad es requerida';
    } else if (data.edad < 15 || data.edad > 100) {
      errors.edad = 'La edad debe estar entre 15 y 100 años';
    }
    
    // Validar teléfono
    if (!data.telefono || data.telefono.trim() === '') {
      errors.telefono = 'El teléfono es requerido';
    }
    
    return errors;
  }

  // Función para campos solo de datos alfabéticos
  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }
}