import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase:string = ConfiguracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient) { }

  /**
   * identificar usuario
   * @param usuario
   * @param clave 
   * @returns datos del usuario valido
   */

  IdentificarUsuario(usuario:string, clave:string): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel> (`${this.urlBase}identificar-usuario`,{
      correo: usuario,
      clave: clave
    });
  }

  /**
   * Almacena los datos del usuario
   * @param datos datos del usuario
   */

  AlmacenarDatosUsuarioIdentificado(datos:UsuarioModel): boolean{
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem("datos-usuario");
    if(datosLS){
      return false;
    }else{
      localStorage.setItem("datos_usuario", cadena);
      return true;
    }
  }

  /**
   * Busca los datos en localStorage de un usuario
   * @returns 
   */

  ObtenerDatosUsuario():UsuarioModel| null{
    let datosLS = localStorage.getItem("datos-usuario");
    if(datosLS){
      let datos= JSON.parse(datosLS);
      return datos;
    }else{
      return null;
    }
  }

  /**
   * Validar 2fa
   * @param usuario 
   * @param clave 
   * @returns 
   */

  ValidarCodigo2FA(idUsuario:string, codigo:string): Observable<object>{
    return this.http.post<UsuarioModel> (`${this.urlBase}verificar-2fa`,{
      usuarioId: idUsuario,
      codigo2fa: codigo
    });
  }
}
