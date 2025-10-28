/**
 * 🐹 COMPONENTE ROEDORES
 *
 * PROPÓSITO:
 * - Mostrar productos de roedores: hámsters, chinchillas, jerbos
 * - Filtrar por múltiples tipos de roedores pequeños
 * - Permitir compra de mascotas pequeñas
 *
 * TIPOS DE ANIMALES INCLUIDOS:
 * - 🐹 Hámsters (dorados, rusos, chinos)
 * - 🐭 Ratones domésticos
 * - 🐰 Chinchillas
 * - 🐭 Jerbos del desierto
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { CarritoService } from '../../../services/carrito.service';
import { AuthService } from '../../../services/auth.service';
import { Producto, Categoria } from '../../../models/producto.model';

@Component({
  selector: 'app-roedores',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './roedores.component.html',
  styleUrl: './roedores.component.css'
})
export class RoedoresComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroOrden = 'nombre';

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  /**
   * 🔍 CARGAR PRODUCTOS DE ROEDORES
   * Obtiene productos de roedores directamente del servicio
   */
  cargarProductos(): void {
    // Obtener todos los productos y filtrar manualmente
    this.productoService.obtenerProductos().subscribe((todosLosProductos: Producto[]) => {
      // Filtrar solo mascotas que sean roedores
      this.productos = todosLosProductos.filter(p => {
        if (p.categoria !== 'mascotas') return false;

        const nombre = p.nombre.toLowerCase();
        const descripcion = p.descripcion.toLowerCase();

        return nombre.includes('hámster') || nombre.includes('hamster') ||
               nombre.includes('chinchilla') || nombre.includes('jerbo') ||
               descripcion.includes('hámster') || descripcion.includes('hamster') ||
               descripcion.includes('chinchilla') || descripcion.includes('dócil');
      });

      this.aplicarFiltros();
      console.log('Todos los productos:', todosLosProductos.length);
      console.log('Productos de roedores encontrados:', this.productos);
    });
  }

  /**
   * 🎯 APLICAR FILTROS DE ORDENACIÓN
   */
  aplicarFiltros(): void {
    let productosOrdenados = [...this.productos];
    switch (this.filtroOrden) {
      case 'precio-asc':
        productosOrdenados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        productosOrdenados.sort((a, b) => b.precio - a.precio);
        break;
      default:
        productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }
    this.productosFiltrados = productosOrdenados;
  }

  /**
   * 🔄 CAMBIO DE FILTRO
   */
  onFiltroChange(): void {
    this.aplicarFiltros();
  }

  /**
   * 🛒 AGREGAR AL CARRITO
   */
  agregarAlCarrito(producto: Producto): void {
    if (this.authService.isCliente()) {
      this.carritoService.agregarProducto(producto);
    }
  }

  /**
   * 🔒 VERIFICAR PERMISOS
   */
  puedeAgregarAlCarrito(): boolean {
    return this.authService.isCliente();
  }
}
