import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { CarritoService } from '../../../services/carrito.service';
import { AuthService } from '../../../services/auth.service';
import { Producto, Categoria } from '../../../models/producto.model';

@Component({
  selector: 'app-aves',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './aves.component.html',
  styleUrl: './aves.component.css'
})
export class AvesComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroOrden = 'nombre';

  constructor(private productoService: ProductoService, private carritoService: CarritoService, public authService: AuthService) {}

  ngOnInit(): void { this.cargarProductos(); }

  cargarProductos(): void {
    this.productoService.obtenerMascotasPorTipo('aves').subscribe((productos: Producto[]) => {
      this.productos = productos.filter((p: Producto) => {
        const nombre = p.nombre.toLowerCase();
        const descripcion = p.descripcion.toLowerCase();
        const mascota = p as any;
        const raza = mascota.raza ? mascota.raza.toLowerCase() : '';

        return nombre.includes('ave') ||
               nombre.includes('pájaro') ||
               nombre.includes('loro') ||
               nombre.includes('canario') ||
               nombre.includes('periquito') ||
               nombre.includes('cacatúa') ||
               descripcion.includes('ave') ||
               descripcion.includes('pájaro') ||
               raza.includes('canario') ||
               raza.includes('periquito') ||
               raza.includes('cacatúa');
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
