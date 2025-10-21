import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { Usuario, TipoUsuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  currentUser: Usuario | null = null;
  isLoggedIn$: Observable<boolean>;
  cantidadCarrito$: Observable<number>;

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.cantidadCarrito$ = this.carritoService.obtenerCantidadItems();
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/catalogo']);
    }
  }

  // Métodos para verificar roles
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isCliente(): boolean {
    return this.authService.isCliente();
  }

  isNoRegistrado(): boolean {
    return this.authService.isNoRegistrado();
  }

  puedeComprar(): boolean {
    return this.authService.tienePermiso('puedeComprar');
  }

  getRoleName(): string {
    const rol = this.authService.getCurrentUserRole();
    switch (rol) {
      case TipoUsuario.ADMIN:
        return 'Administrador';
      case TipoUsuario.CLIENTE:
        return 'Cliente';
      default:
        return 'Invitado';
    }
  }
}
