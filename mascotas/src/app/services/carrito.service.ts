import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemCarrito, Carrito } from '../models/carrito.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<Carrito>({
    items: [],
    total: 0,
    cantidadItems: 0
  });

  public carrito$ = this.carritoSubject.asObservable();

  constructor() {
    // Cargar carrito desde localStorage si existe
    this.cargarCarritoDelStorage();
  }

  private cargarCarritoDelStorage(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      const carrito = JSON.parse(carritoGuardado);
      this.carritoSubject.next(carrito);
    }
  }

  private guardarCarritoEnStorage(carrito: Carrito): void {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  agregarProducto(producto: Producto, cantidad: number = 1): void {
    const carritoActual = this.carritoSubject.value;
    const itemExistente = carritoActual.items.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      // Si el producto ya existe, incrementar la cantidad
      itemExistente.cantidad += cantidad;
      itemExistente.subtotal = itemExistente.cantidad * this.obtenerPrecioFinal(producto);
    } else {
      // Si es un producto nuevo, agregarlo al carrito
      const nuevoItem: ItemCarrito = {
        id: Date.now(), // ID temporal
        producto: producto,
        cantidad: cantidad,
        subtotal: cantidad * this.obtenerPrecioFinal(producto)
      };
      carritoActual.items.push(nuevoItem);
    }

    this.actualizarCarrito(carritoActual);
  }

  eliminarProducto(productoId: number): void {
    const carritoActual = this.carritoSubject.value;
    carritoActual.items = carritoActual.items.filter(item => item.producto.id !== productoId);
    this.actualizarCarrito(carritoActual);
  }

  actualizarCantidad(productoId: number, nuevaCantidad: number): void {
    if (nuevaCantidad <= 0) {
      this.eliminarProducto(productoId);
      return;
    }

    const carritoActual = this.carritoSubject.value;
    const item = carritoActual.items.find(item => item.producto.id === productoId);

    if (item) {
      item.cantidad = nuevaCantidad;
      item.subtotal = nuevaCantidad * this.obtenerPrecioFinal(item.producto);
      this.actualizarCarrito(carritoActual);
    }
  }

  limpiarCarrito(): void {
    const carritoVacio: Carrito = {
      items: [],
      total: 0,
      cantidadItems: 0
    };
    this.carritoSubject.next(carritoVacio);
    this.guardarCarritoEnStorage(carritoVacio);
  }

  obtenerCarrito(): Observable<Carrito> {
    return this.carrito$;
  }

  obtenerCantidadItems(): Observable<number> {
    return this.carrito$.pipe(
      map(carrito => carrito.cantidadItems)
    );
  }

  private actualizarCarrito(carrito: Carrito): void {
    // Recalcular totales
    carrito.total = carrito.items.reduce((total, item) => total + item.subtotal, 0);
    carrito.cantidadItems = carrito.items.reduce((total, item) => total + item.cantidad, 0);

    // Actualizar estado y guardar en localStorage
    this.carritoSubject.next(carrito);
    this.guardarCarritoEnStorage(carrito);
  }

  private obtenerPrecioFinal(producto: Producto): number {
    return producto.enOferta && producto.precioOferta ? producto.precioOferta : producto.precio;
  }

  estaEnCarrito(productoId: number): boolean {
    const carrito = this.carritoSubject.value;
    return carrito.items.some(item => item.producto.id === productoId);
  }

  obtenerCantidadEnCarrito(productoId: number): number {
    const carrito = this.carritoSubject.value;
    const item = carrito.items.find(item => item.producto.id === productoId);
    return item ? item.cantidad : 0;
  }
}
