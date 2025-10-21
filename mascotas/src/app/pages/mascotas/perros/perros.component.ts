import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { CarritoService } from '../../../services/carrito.service';
import { AuthService } from '../../../services/auth.service';
import { Producto, Categoria } from '../../../models/producto.model';

@Component({
  selector: 'app-perros',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './perros.component.html',
  styleUrl: './perros.component.css'
})
export class PerrosComponent implements OnInit {
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
    this.productoService.obtenerMascotasPorTipo('perros').subscribe((productos: Producto[]) => {
      this.productos = productos;
      this.aplicarFiltros();
    });
  }  aplicarFiltros(): void {
    let productosOrdenados = [...this.productos];

    switch (this.filtroOrden) {
      case 'precio-asc':
        productosOrdenados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        productosOrdenados.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
      default:
        productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }

    this.productosFiltrados = productosOrdenados;
  }

  onFiltroChange(): void {
    this.aplicarFiltros();
  }

  agregarAlCarrito(producto: Producto): void {
    if (this.authService.isCliente()) {
      this.carritoService.agregarProducto(producto);
    }
  }

  puedeAgregarAlCarrito(): boolean {
    return this.authService.isCliente();
  }

  // Helper methods para acceder a propiedades de Mascota
  getMascotaRaza(producto: Producto): string | undefined {
    return (producto as any).raza;
  }

  getMascotaEdad(producto: Producto): string | undefined {
    return (producto as any).edad;
  }

  getMascotaSexo(producto: Producto): string | undefined {
    return (producto as any).sexo;
  }

  getMascotaTamano(producto: Producto): string | undefined {
    return (producto as any).tamano;
  }

  getMascotaVacunado(producto: Producto): boolean | undefined {
    return (producto as any).vacunado;
  }

  getMascotaEsterilizado(producto: Producto): boolean | undefined {
    return (producto as any).esterilizado;
  }
}
