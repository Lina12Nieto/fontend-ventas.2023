import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import {MD5} from 'crypto-js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  styleUrls: ['./identificacion-usuario.component.css']
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required,]]
    });
  }

  IdentificarUsuario() {
    if (this.fGroup.invalid) {
      alert("Datos incompletos");
    } else {
      let usuario = this.obtenerFormGroup['usario'].value;
      let clave = this.obtenerFormGroup['clave'].value;
      let claveCifrada = MD5(clave).toString();
      this.servicioSeguridad.IdentificarUsuario(usuario,claveCifrada).subscribe({
        next: (datos:any)=> {
          if(datos._id == undefined || datos._id ==null){
            alert("Credenciales incorrectos o falta validacion del correo electronico")
          }else{
            console.log(datos);
            if(this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(datos)){
              this.router.navigate(["/seguridad/2fa"]);
            }
          }
        },
        error: (err)=>{
          console.log(err);
        }
      });
    }
  }

  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
