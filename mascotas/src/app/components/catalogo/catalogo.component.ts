import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Producto, Categoria } from '../../models/producto.model';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias = Object.values(Categoria);
  categoriaSeleccionada: string = '';
  terminoBusqueda: string = '';
  isLoading = true;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.isLoading = true;
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.isLoading = false;
      }
    });
  }

  aplicarFiltros(): void {
    let resultados = [...this.productos];

    // Filtrar por categoría
    if (this.categoriaSeleccionada) {
      resultados = resultados.filter(p => p.categoria === this.categoriaSeleccionada);
    }

    // Filtrar por término de búsqueda
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultados = resultados.filter(p =>
        p.nombre.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino)
      );
    }

    this.productosFiltrados = resultados;
  }

  onCategoriaChange(): void {
    this.aplicarFiltros();
  }

  onBusquedaChange(): void {
    this.aplicarFiltros();
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto, 1);
    // Mostrar una notificación o feedback visual aquí
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

  getCategoriaDisplayName(categoria: string): string {
    const nombres: { [key: string]: string } = {
      'mascotas': 'Mascotas',
      'alimentacion': 'Alimentación',
      'accesorios': 'Accesorios',
      'juguetes': 'Juguetes',
      'higiene': 'Higiene'
    };
    return nombres[categoria] || categoria;
  }

  // Métodos para verificar permisos
  puedeComprar(): boolean {
    return this.authService.tienePermiso('puedeComprar');
  }

  isNoRegistrado(): boolean {
    return this.authService.isNoRegistrado();
  }

  mostrarMensajeRegistro(): void {
    alert('Debes registrarte para poder comprar productos. ¡Haz clic en "Registrarse" en el menú!');
  }
}
