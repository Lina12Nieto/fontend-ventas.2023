import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarSesionActivaGuard implements CanActivate {
  constructor(
    private servicoSeguridad: SeguridadService,
    private router: Router
  ){

  }
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let existeSesion = this.servicoSeguridad.ValidacionDeSesion();
    if(existeSesion){
      return true;
    }
    this.router.navigate(["/inicio"]);
    return false;
  }
  
}
