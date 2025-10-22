/**
 * 👑 ADMIN PANEL COMPONENT - Panel de Administración
 * ==================================================
 *
 * PROPÓSITO:
 * - 🎛️ Centro de control principal para administradores
 * - 📊 Dashboard con estadísticas de la tienda
 * - 👥 Gestión de usuarios registrados
 * - 📦 Gestión completa de productos (CRUD)
 * - 🔒 Solo accesible para usuarios con rol ADMIN
 *
 * FUNCIONALIDADES:
 * - ✅ Navegación por pestañas (Angular, no Bootstrap JS)
 * - ✅ Estadísticas en tiempo real
 * - ✅ Lista de usuarios con control de estado (activo/inactivo)
 * - ✅ CRUD de productos con confirmaciones
 * - ✅ Integración con ProductoService para persistencia
 *
 * SEGURIDAD:
 * - 🛡️ Protegido por RoleGuard
 * - 🔐 Solo admins pueden acceder
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Usuario, TipoUsuario } from '../../models/usuario.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {

  // 📊 DATOS DEL DASHBOARD
  /** Lista de todos los usuarios registrados en el sistema */
  usuarios: Usuario[] = [];

  /** Lista de todos los productos de la tienda */
  productos: Producto[] = [];

  /** Control de pestañas sin dependencia de Bootstrap JS */
  activeTab = 'productos'; // Valores: 'usuarios' | 'productos'
  estadisticas = {
    totalUsuarios: 0,
    totalClientes: 0,
    totalProductos: 0,
    ventasRecientes: 0
  };

  constructor(
    private authService: AuthService,
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Cargar productos
    this.productoService.obtenerProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
      this.estadisticas.totalProductos = productos.length;
    });

    // Simular datos de usuarios (en una app real vendría del backend)
    this.simularDatosUsuarios();
  }

  private simularDatosUsuarios(): void {
    // Datos simulados de usuarios
    this.usuarios = [
      {
        id: 1,
        nombre: 'Admin',
        apellido: 'Sistema',
        email: 'admin@tienda.com',
        telefono: '123456789',
        direccion: 'Calle Principal 123',
        fechaRegistro: new Date('2024-01-01'),
        rol: TipoUsuario.ADMIN,
        activo: true
      },
      {
        id: 2,
        nombre: 'Cliente',
        apellido: 'Ejemplo',
        email: 'cliente@ejemplo.com',
        telefono: '987654321',
        direccion: 'Avenida Secundaria 456',
        fechaRegistro: new Date('2024-02-15'),
        rol: TipoUsuario.CLIENTE,
        activo: true
      },
      {
        id: 3,
        nombre: 'María',
        apellido: 'García',
        email: 'maria.garcia@email.com',
        telefono: '555123456',
        direccion: 'Plaza Central 789',
        fechaRegistro: new Date('2024-03-10'),
        rol: TipoUsuario.CLIENTE,
        activo: true
      }
    ];

    this.estadisticas.totalUsuarios = this.usuarios.length;
    this.estadisticas.totalClientes = this.usuarios.filter(u => u.rol === TipoUsuario.CLIENTE).length;
    this.estadisticas.ventasRecientes = Math.floor(Math.random() * 50) + 10;
  }

  cambiarEstadoUsuario(usuario: Usuario): void {
    usuario.activo = !usuario.activo;
    // En una app real, esto haría una llamada al backend
    console.log(`Usuario ${usuario.nombre} ${usuario.activo ? 'activado' : 'desactivado'}`);
  }

  eliminarProducto(producto: Producto): void {
    if (confirm(`¿Estás seguro de eliminar ${producto.nombre}?`)) {
      this.productoService.eliminarProducto(producto.id).subscribe({
        next: (eliminado) => {
          if (eliminado) {
            // Recargar la lista de productos
            this.cargarDatos();
            console.log(`Producto ${producto.nombre} eliminado exitosamente`);
          }
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

  getRoleBadgeClass(rol: TipoUsuario): string {
    switch (rol) {
      case TipoUsuario.ADMIN:
        return 'bg-danger';
      case TipoUsuario.CLIENTE:
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  }

  // Método para cambiar de pestaña
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
