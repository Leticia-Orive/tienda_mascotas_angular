import { Producto } from './producto.model';

export interface ItemCarrito {
  id: number;
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

export interface Carrito {
  items: ItemCarrito[];
  total: number;
  cantidadItems: number;
}

export interface Pedido {
  id: number;
  items: ItemCarrito[];
  total: number;
  fecha: Date;
  estado: EstadoPedido;
  direccionEntrega: string;
}

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  PROCESANDO = 'procesando',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado'
}
