import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Carrito, ItemCarrito } from '../../models/carrito.model';
import { MetodoPago, DatosPago } from '../../models/pago.model';

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
  mostrarFormularioPago = false;

  // Opciones de pago
  MetodoPago = MetodoPago;
  metodoPagoSeleccionado: MetodoPago | null = null;

  // Datos del formulario de pago
  datosPago: DatosPago = {
    metodo: MetodoPago.EFECTIVO,
    numeroTarjeta: '',
    nombreTitular: '',
    fechaVencimiento: '',
    cvv: '',
    direccionEntrega: '',
    telefonoContacto: ''
  };

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

    // Mostrar selección de método de pago
    this.mostrarFormularioPago = true;
  }

  seleccionarMetodoPago(metodo: MetodoPago): void {
    this.metodoPagoSeleccionado = metodo;
    this.datosPago.metodo = metodo;
  }

  continuarConPago(): void {
    if (!this.metodoPagoSeleccionado) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    // Validar datos según el método de pago
    if (this.metodoPagoSeleccionado === MetodoPago.TARJETA) {
      if (!this.datosPago.numeroTarjeta || !this.datosPago.nombreTitular ||
          !this.datosPago.fechaVencimiento || !this.datosPago.cvv) {
        alert('Por favor completa todos los datos de la tarjeta');
        return;
      }
    } else if (this.metodoPagoSeleccionado === MetodoPago.EFECTIVO) {
      if (!this.datosPago.direccionEntrega || !this.datosPago.telefonoContacto) {
        alert('Por favor proporciona la dirección de entrega y teléfono de contacto');
        return;
      }
    }

    this.mostrarFormularioPago = false;
    this.mostrarResumenCompra = true;
  }

  confirmarCompra(): void {
    const metodoPagoTexto = this.metodoPagoSeleccionado === MetodoPago.EFECTIVO ? 'efectivo' : 'tarjeta';

    if (this.metodoPagoSeleccionado === MetodoPago.EFECTIVO) {
      alert(`¡Compra confirmada! 💵\n\nMétodo de pago: Efectivo (Pago contra entrega)\nDirección: ${this.datosPago.direccionEntrega}\nTeléfono: ${this.datosPago.telefonoContacto}\nTotal: $${this.carrito.total}\n\n¡Gracias por tu compra! Te contactaremos pronto.`);
    } else {
      const tarjetaOculta = '****-****-****-' + this.datosPago.numeroTarjeta?.slice(-4);
      alert(`¡Compra confirmada! 💳\n\nMétodo de pago: Tarjeta ${tarjetaOculta}\nTitular: ${this.datosPago.nombreTitular}\nTotal: $${this.carrito.total}\n\n¡Gracias por tu compra! Recibirás un email de confirmación.`);
    }

    this.carritoService.limpiarCarrito();
    this.mostrarResumenCompra = false;
    this.mostrarFormularioPago = false;
    this.metodoPagoSeleccionado = null;
    this.resetearDatosPago();
  }

  cancelarCompra(): void {
    this.mostrarResumenCompra = false;
    this.mostrarFormularioPago = false;
    this.metodoPagoSeleccionado = null;
    this.resetearDatosPago();
  }

  private resetearDatosPago(): void {
    this.datosPago = {
      metodo: MetodoPago.EFECTIVO,
      numeroTarjeta: '',
      nombreTitular: '',
      fechaVencimiento: '',
      cvv: '',
      direccionEntrega: '',
      telefonoContacto: ''
    };
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
