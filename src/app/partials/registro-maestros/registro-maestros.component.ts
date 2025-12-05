import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestroComponent implements OnInit {

  @Input() rol: string = "maestro";
  @Input() datos_user: any = {};

  public maestro: any = {};
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
    this.maestro = this.esquemaMaestro();
    this.maestro.rol = this.rol;
    console.log("Datos maestro: ", this.maestro);
  }

  // Esquema del maestro
  public esquemaMaestro(): any {
    return {
      clave_trabajador: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: '',
      telefono: '',
      rfc: '',
      cubiculo: '',
      area_investigacion: '',
      materias: {
        aplicaciones_web: false,
        programacion_1: false,
        bases_datos: false,
        tecnologias_web: false,
        mineria_datos: false,
        desarrollo_movil: false,
        estructuras_datos: false,
        admin_redes: false,
        ingenieria_software: false,
        admin_so: false
      },
      rol: 'maestro'
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
    this.errors = this.validarMaestro(this.maestro, this.editar);
    
    if (Object.keys(this.errors).length > 0) {
      return false;
    }
    
    console.log("Pasó la validación");
    console.log("Datos del maestro:", this.maestro);
    console.log("Materias seleccionadas:", this.obtenerMateriasSeleccionadas());
    // TODO: Aquí va la lógica para registrar al maestro
  }

  public actualizar() {
    this.errors = {};
    this.errors = this.validarMaestro(this.maestro, this.editar);
    
    if (Object.keys(this.errors).length > 0) {
      return false;
    }
    
    console.log("Actualizando maestro");
    // TODO: Aquí va la lógica para actualizar al maestro
  }

  // Obtener materias seleccionadas
  public obtenerMateriasSeleccionadas(): string[] {
    const materiasSeleccionadas: string[] = [];
    
    Object.keys(this.maestro.materias).forEach(key => {
      if (this.maestro.materias[key] === true) {
        materiasSeleccionadas.push(key);
      }
    });
    
    return materiasSeleccionadas;
  }

  // Validación del maestro
  public validarMaestro(data: any, editar: boolean): any {
    let errors: any = {};
    
    // Validar clave de trabajador
    if (!data.clave_trabajador || data.clave_trabajador.trim() === '') {
      errors.clave_trabajador = 'La clave de trabajador es requerida';
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
    
    // Validar teléfono
    if (!data.telefono || data.telefono.trim() === '') {
      errors.telefono = 'El teléfono es requerido';
    }
    
    // Validar RFC
    if (!data.rfc || data.rfc.trim() === '') {
      errors.rfc = 'El RFC es requerido';
    } else if (data.rfc.length < 12 || data.rfc.length > 13) {
      errors.rfc = 'El RFC debe tener entre 12 y 13 caracteres';
    }
    
    // Validar cubículo
    if (!data.cubiculo || data.cubiculo.trim() === '') {
      errors.cubiculo = 'El cubículo es requerido';
    }
    
    // Validar área de investigación
    if (!data.area_investigacion || data.area_investigacion === '') {
      errors.area_investigacion = 'El área de investigación es requerida';
    }
    
    // Validar que al menos una materia esté seleccionada
    const materiasSeleccionadas = Object.values(data.materias).filter(value => value === true);
    if (materiasSeleccionadas.length === 0) {
      errors.materias = 'Debes seleccionar al menos una materia';
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