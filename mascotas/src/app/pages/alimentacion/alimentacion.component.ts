import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto, Categoria } from '../../models/producto.model';

@Component({
  selector: 'app-alimentacion',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './alimentacion.component.html',
  styleUrl: './alimentacion.component.css'
})
export class AlimentacionComponent implements OnInit {
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
    this.productoService.obtenerProductosPorCategoria(Categoria.ALIMENTACION).subscribe({
      next: (productos) => {
        this.productos = productos;
        this.productosFiltrados = productos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos de alimentación:', error);
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
