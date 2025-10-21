import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { CarritoService } from '../../../services/carrito.service';
import { AuthService } from '../../../services/auth.service';
import { Producto, Categoria } from '../../../models/producto.model';

@Component({
  selector: 'app-conejos',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './conejos.component.html',
  styleUrl: './conejos.component.css'
})
export class ConejosComponent implements OnInit {
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

  cargarProductos(): void {
    this.productoService.obtenerMascotasPorTipo('conejos').subscribe((productos: Producto[]) => {
      this.productos = productos.filter((p: Producto) => {
        const nombre = p.nombre.toLowerCase();
        const descripcion = p.descripcion.toLowerCase();
        const mascota = p as any;
        const raza = mascota.raza ? mascota.raza.toLowerCase() : '';

        return nombre.includes('conejo') ||
               nombre.includes('conejito') ||
               descripcion.includes('conejo') ||
               raza.includes('holland') ||
               raza.includes('angora') ||
               raza.includes('rex');
      });
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    let productosOrdenados = [...this.productos];
    switch (this.filtroOrden) {
      case 'precio-asc': productosOrdenados.sort((a, b) => a.precio - b.precio); break;
      case 'precio-desc': productosOrdenados.sort((a, b) => b.precio - a.precio); break;
      default: productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
    }
    this.productosFiltrados = productosOrdenados;
  }

  onFiltroChange(): void { this.aplicarFiltros(); }
  agregarAlCarrito(producto: Producto): void { if (this.authService.isCliente()) this.carritoService.agregarProducto(producto); }
  puedeAgregarAlCarrito(): boolean { return this.authService.isCliente(); }
}
