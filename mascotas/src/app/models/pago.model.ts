/**
 * 💳 MODELO DE PAGO
 * 
 * PROPÓSITO:
 * - Definir los tipos de métodos de pago disponibles
 * - Estructurar la información de pago del usuario
 * 
 * MÉTODOS SOPORTADOS:
 * - 💵 Efectivo (pago contra entrega)
 * - 💳 Tarjeta (débito/crédito)
 */

export enum MetodoPago {
  EFECTIVO = 'efectivo',
  TARJETA = 'tarjeta'
}

export interface DatosPago {
  metodo: MetodoPago;
  // Para pago con tarjeta
  numeroTarjeta?: string;
  nombreTitular?: string;
  fechaVencimiento?: string;
  cvv?: string;
  // Para pago en efectivo
  direccionEntrega?: string;
  telefonoContacto?: string;
}

export interface ResumenCompra {
  items: any[];
  total: number;
  metodoPago: MetodoPago;
  datosPago: DatosPago;
  fechaCompra: Date;
}