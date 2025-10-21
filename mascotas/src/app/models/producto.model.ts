export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: Categoria;
  stock: number;
  enOferta?: boolean;
  precioOferta?: number;
}

export interface Mascota extends Producto {
  raza: string;
  edad: string; // Ejemplo: "3 meses", "2 años"
  sexo: 'Macho' | 'Hembra';
  tamano: 'Pequeño' | 'Mediano' | 'Grande';
  vacunado: boolean;
  esterilizado: boolean;
}

export enum Categoria {
  MASCOTAS = 'mascotas',
  ALIMENTACION = 'alimentacion',
  ACCESORIOS = 'accesorios',
  JUGUETES = 'juguetes',
  HIGIENE = 'higiene'
}
