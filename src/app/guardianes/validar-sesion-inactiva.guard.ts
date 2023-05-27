import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';

export const ValidarSesionInactivaGuard = () => {
  const servicioSeguridad = inject(SeguridadService);
  const router = inject(Router);
  
  let existeSesion= servicioSeguridad.ValidacionDeSesion();
  if (existeSesion){
    router.navigate(["/inicio"]);
    return false;
  }else{
    return true;
  }
}

/*
@Injectable({
  providedIn: 'root'
})
export class ValidarSesionInactivaGuard implements CanActivate {
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
      this.router.navigate(["/inicio"]);
      return false;
    }
    return true;
  }
  
}*/
