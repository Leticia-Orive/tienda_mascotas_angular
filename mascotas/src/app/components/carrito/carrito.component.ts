import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Carrito, ItemCarrito } from '../../models/carrito.model';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: Carrito = { items: [], total: 0, cantidadItems: 0 };
  isLoggedIn = false;
  mostrarResumenCompra = false;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe(carrito => {
      this.carrito = carrito;
    });

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  actualizarCantidad(productoId: number, nuevaCantidad: number): void {
    if (nuevaCantidad >= 1) {
      this.carritoService.actualizarCantidad(productoId, nuevaCantidad);
    }
  }

  eliminarProducto(productoId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto del carrito?')) {
      this.carritoService.eliminarProducto(productoId);
    }
  }

  limpiarCarrito(): void {
    if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
      this.carritoService.limpiarCarrito();
    }
  }

  procederAlPago(): void {
    if (!this.isLoggedIn) {
      alert('Debes iniciar sesión para proceder con la compra');
      return;
    }

    if (this.carrito.items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    this.mostrarResumenCompra = true;
  }

  confirmarCompra(): void {
    // Aquí implementarías la lógica de procesamiento de pago
    // Por ahora, simulamos una compra exitosa
    alert('¡Compra realizada con éxito! Gracias por tu compra.');
    this.carritoService.limpiarCarrito();
    this.mostrarResumenCompra = false;
  }

  cancelarCompra(): void {
    this.mostrarResumenCompra = false;
  }

  obtenerPrecioFinal(item: ItemCarrito): number {
    const producto = item.producto;
    return producto.enOferta && producto.precioOferta ? producto.precioOferta : producto.precio;
  }

  incrementarCantidad(productoId: number): void {
    const item = this.carrito.items.find(i => i.producto.id === productoId);
    if (item) {
      this.actualizarCantidad(productoId, item.cantidad + 1);
    }
  }

  decrementarCantidad(productoId: number): void {
    const item = this.carrito.items.find(i => i.producto.id === productoId);
    if (item && item.cantidad > 1) {
      this.actualizarCantidad(productoId, item.cantidad - 1);
    }
  }
}
