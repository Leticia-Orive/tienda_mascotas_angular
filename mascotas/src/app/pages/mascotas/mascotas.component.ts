import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto, Categoria } from '../../models/producto.model';

@Component({
  selector: 'app-mascotas',
  imports: [CommonModule, RouterModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent implements OnInit {
  mascotas: Producto[] = [];
  isLoading = true;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.isLoading = true;
    this.productoService.obtenerProductosPorCategoria(Categoria.MASCOTAS).subscribe({
      next: (productos) => {
        this.mascotas = productos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar mascotas:', error);
        this.isLoading = false;
      }
    });
  }

  agregarAlCarrito(mascota: Producto): void {
    this.carritoService.agregarProducto(mascota, 1);
  }

  obtenerPrecioFinal(mascota: Producto): number {
    return mascota.enOferta && mascota.precioOferta ? mascota.precioOferta : mascota.precio;
  }

  estaEnCarrito(mascotaId: number): boolean {
    return this.carritoService.estaEnCarrito(mascotaId);
  }

  obtenerCantidadEnCarrito(mascotaId: number): number {
    return this.carritoService.obtenerCantidadEnCarrito(mascotaId);
  }

  // Métodos para obtener propiedades específicas de mascotas
  obtenerEdad(mascota: any): string {
    return mascota.edad || 'No especificado';
  }

  obtenerSexo(mascota: any): string {
    return mascota.sexo || 'No especificado';
  }

  obtenerTamano(mascota: any): string {
    return mascota.tamano || 'No especificado';
  }

  estaVacunado(mascota: any): boolean {
    return mascota.vacunado || false;
  }

  estaEsterilizado(mascota: any): boolean {
    return mascota.esterilizado || false;
  }
}
