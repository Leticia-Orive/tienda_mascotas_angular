import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Producto, Mascota } from '../../models/producto.model';

@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {
  producto?: Producto;
  isLoading = true;
  cantidad: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.cargarProducto(id);
      }
    });
  }

  private cargarProducto(id: number): void {
    this.isLoading = true;
    this.productoService.obtenerProductoPorId(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.cantidad = 1; // Reinicializar cantidad cuando se carga el producto
        this.isLoading = false;

        if (!producto) {
          this.router.navigate(['/catalogo']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/catalogo']);
      }
    });
  }

  agregarAlCarrito(): void {
    if (this.producto && this.puedeComprar()) {
      this.carritoService.agregarProducto(this.producto, this.cantidad);
    } else if (!this.puedeComprar()) {
      this.router.navigate(['/login']);
    }
  }

  incrementarCantidad(): void {
    if (this.producto && this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }

  decrementarCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  validarCantidad(): void {
    console.log('Validando cantidad:', this.cantidad, typeof this.cantidad);
    
    if (!this.producto) return;
    
    // Convertir a número si es string
    if (typeof this.cantidad === 'string') {
      this.cantidad = parseInt(this.cantidad, 10);
    }
    
    // Asegurar que la cantidad sea un número válido
    if (isNaN(this.cantidad) || this.cantidad < 1) {
      this.cantidad = 1;
    } else if (this.cantidad > this.producto.stock) {
      this.cantidad = this.producto.stock;
    } else {
      // Asegurar que sea un número entero
      this.cantidad = Math.floor(this.cantidad);
    }
    
    console.log('Cantidad después de validar:', this.cantidad);
  }  obtenerPrecioFinal(): number {
    if (!this.producto) return 0;
    return this.producto.enOferta && this.producto.precioOferta
      ? this.producto.precioOferta
      : this.producto.precio;
  }

  obtenerPrecioTotal(): number {
    return this.obtenerPrecioFinal() * this.cantidad;
  }

  estaEnCarrito(): boolean {
    return this.producto ? this.carritoService.estaEnCarrito(this.producto.id) : false;
  }

  getCantidadEnCarrito(): number {
    return this.producto ? this.carritoService.obtenerCantidadEnCarrito(this.producto.id) : 0;
  }

  // Métodos para verificar permisos
  puedeComprar(): boolean {
    return this.authService.tienePermiso('puedeComprar');
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Métodos específicos para mascotas
  esMascota(): boolean {
    return this.producto?.categoria === 'mascotas';
  }

  obtenerMascota(): Mascota | undefined {
    return this.esMascota() ? (this.producto as Mascota) : undefined;
  }

  volver(): void {
    window.history.back();
  }
}
