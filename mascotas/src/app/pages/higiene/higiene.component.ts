import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto, Categoria } from '../../models/producto.model';

@Component({
  selector: 'app-higiene',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './higiene.component.html',
  styleUrl: './higiene.component.css'
})
export class HigieneComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  isLoading = true;
  terminoBusqueda = '';

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.isLoading = true;
    this.productoService.obtenerProductosPorCategoria(Categoria.HIGIENE).subscribe({
      next: (productos) => {
        this.productos = productos;
        this.productosFiltrados = productos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos de higiene:', error);
        this.isLoading = false;
      }
    });
  }

  buscarProductos(): void {
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      this.productosFiltrados = this.productos.filter(p =>
        p.nombre.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino)
      );
    } else {
      this.productosFiltrados = [...this.productos];
    }
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto, 1);
  }

  obtenerPrecioFinal(producto: Producto): number {
    return producto.enOferta && producto.precioOferta ? producto.precioOferta : producto.precio;
  }

  estaEnCarrito(productoId: number): boolean {
    return this.carritoService.estaEnCarrito(productoId);
  }

  obtenerCantidadEnCarrito(productoId: number): number {
    return this.carritoService.obtenerCantidadEnCarrito(productoId);
  }
}
