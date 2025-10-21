import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Producto, Mascota, Categoria } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  public productos$ = this.productosSubject.asObservable();

  constructor() {
    this.cargarProductosIniciales();
  }

  private cargarProductosIniciales(): void {
    const productos: Producto[] = [
      // Mascotas
      {
        id: 1,
        nombre: 'Golden Retriever Cachorro',
        descripcion: 'Hermoso cachorro Golden Retriever de 3 meses, vacunado y desparasitado.',
        precio: 800,
        imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 2,
        raza: 'Golden Retriever',
        edad: '3 meses',
        sexo: 'Macho',
        tamano: 'Grande',
        vacunado: true,
        esterilizado: false
      } as Mascota,
      {
        id: 2,
        nombre: 'Gato Persa',
        descripcion: 'Gato Persa adulto, muy cariñoso y bien cuidado.',
        precio: 500,
        imagen: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 1,
        raza: 'Persa',
        edad: '2 años',
        sexo: 'Hembra',
        tamano: 'Mediano',
        vacunado: true,
        esterilizado: true
      } as Mascota,

      // Alimentación
      {
        id: 3,
        nombre: 'Alimento Premium para Perros',
        descripcion: 'Alimento balanceado premium para perros adultos. Bolsa de 15kg.',
        precio: 85,
        imagen: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop',
        categoria: Categoria.ALIMENTACION,
        stock: 25,
        enOferta: true,
        precioOferta: 75
      },
      {
        id: 4,
        nombre: 'Alimento para Gatos',
        descripcion: 'Alimento nutritivo para gatos de todas las edades. Bolsa de 10kg.',
        precio: 60,
        imagen: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
        categoria: Categoria.ALIMENTACION,
        stock: 20
      },

      // Accesorios
      {
        id: 5,
        nombre: 'Collar Ajustable',
        descripcion: 'Collar ajustable de nylon resistente con hebilla de seguridad.',
        precio: 15,
        imagen: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
        categoria: Categoria.ACCESORIOS,
        stock: 50
      },
      {
        id: 6,
        nombre: 'Cama para Mascotas',
        descripcion: 'Cama cómoda y lavable para perros y gatos medianos.',
        precio: 45,
        imagen: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop',
        categoria: Categoria.ACCESORIOS,
        stock: 15
      },

      // Juguetes
      {
        id: 7,
        nombre: 'Pelota de Goma',
        descripcion: 'Pelota resistente para perros, ideal para juegos al aire libre.',
        precio: 12,
        imagen: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop',
        categoria: Categoria.JUGUETES,
        stock: 30
      },
      {
        id: 8,
        nombre: 'Ratón de Juguete para Gatos',
        descripcion: 'Ratón de peluche con hierba gatera para entretenimiento felino.',
        precio: 8,
        imagen: 'https://images.unsplash.com/photo-1545529468-42764ef8c85f?w=300&h=300&fit=crop',
        categoria: Categoria.JUGUETES,
        stock: 40
      },

      // Higiene
      {
        id: 9,
        nombre: 'Champú para Mascotas',
        descripcion: 'Champú suave y natural para el cuidado del pelaje de tu mascota.',
        precio: 18,
        imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
        categoria: Categoria.HIGIENE,
        stock: 25
      },
      {
        id: 10,
        nombre: 'Cepillo de Dientes para Mascotas',
        descripcion: 'Kit completo de higiene dental para mascotas pequeñas y medianas.',
        precio: 22,
        imagen: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
        categoria: Categoria.HIGIENE,
        stock: 15
      }
    ];

    this.productosSubject.next(productos);
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.productos$;
  }

  obtenerProductoPorId(id: number): Observable<Producto | undefined> {
    const productos = this.productosSubject.value;
    const producto = productos.find(p => p.id === id);
    return of(producto);
  }

  obtenerProductosPorCategoria(categoria: Categoria): Observable<Producto[]> {
    const productos = this.productosSubject.value;
    const productosFiltrados = productos.filter(p => p.categoria === categoria);
    return of(productosFiltrados);
  }

  buscarProductos(termino: string): Observable<Producto[]> {
    const productos = this.productosSubject.value;
    const productosFiltrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(termino.toLowerCase())
    );
    return of(productosFiltrados);
  }
}
