import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TipoUsuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const rolesPermitidos = route.data['roles'] as TipoUsuario[];

    return this.authService.currentUser$.pipe(
      take(1),
      map(usuario => {
        const rolUsuario = this.authService.getCurrentUserRole();

        // Si no hay roles específicos requeridos, permitir acceso
        if (!rolesPermitidos || rolesPermitidos.length === 0) {
          return true;
        }

        // Verificar si el rol del usuario está en la lista de roles permitidos
        if (rolesPermitidos.includes(rolUsuario)) {
          return true;
        }

        // Redirigir según el rol
        if (rolUsuario === TipoUsuario.NO_REGISTRADO) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/access-denied']); // Redirigir a página de acceso denegado
        }

        return false;
      })
    );
  }
}
