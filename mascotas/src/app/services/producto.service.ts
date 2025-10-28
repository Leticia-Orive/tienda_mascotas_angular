/**
 * 🏪 PRODUCTO SERVICE - Servicio Principal de Gestión de Productos
 * ================================================================
 *
 * PROPÓSITO:
 * - 🗄️ Gestiona todos los productos de la tienda (CRUD completo)
 * - 💾 Implementa persistencia con localStorage
 * - 🔄 Usa programación reactiva con RxJS
 * - 🎯 Proporciona filtrado por categorías y subcategorías
 *
 * FUNCIONALIDADES PRINCIPALES:
 * - ✅ Crear productos nuevos (solo admins)
 * - ✅ Leer/Obtener productos con filtros
 * - ✅ Actualizar productos existentes (solo admins)
 * - ✅ Eliminar productos (solo admins)
 * - ✅ Filtrado por tipo de mascota (perros, gatos, etc.)
 * - ✅ Persistencia automática en localStorage
 *
 * PATRÓN DE DISEÑO:
 * - Repository Pattern para acceso a datos
 * - Observable Pattern para notificaciones reactivas
 * - Singleton (providedIn: 'root')
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Producto, Mascota, Categoria } from '../models/producto.model';

@Injectable({
  providedIn: 'root' // Hace el servicio singleton en toda la app
})
export class ProductoService {

  // 📊 ESTADO REACTIVO: BehaviorSubject mantiene el estado actual de productos
  private productosSubject = new BehaviorSubject<Producto[]>([]);

  // 🔄 OBSERVABLE PÚBLICO: Los componentes se suscriben a este observable
  public productos$ = this.productosSubject.asObservable();

  // 🔑 CLAVE DE ALMACENAMIENTO: Identificador único para localStorage
  private readonly STORAGE_KEY = 'tienda_mascotas_productos';

  constructor() {
    this.cargarProductosIniciales();
  }

  private cargarProductosIniciales(): void {
    // Intentar cargar desde localStorage primero
    const productosGuardados = this.cargarDesdeLocalStorage();
    if (productosGuardados.length > 0) {
      this.productosSubject.next(productosGuardados);
    } else {
      // Si no hay datos guardados, cargar datos iniciales
      this.cargarDatosDesdeJSON();
    }
  }

  private cargarDatosDesdeJSON(): void {
    // Por ahora, datos básicos. En una app real, se cargarían desde una API
    const productos: Producto[] = [
      // PERROS
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
        id: 101,
        nombre: 'Pastor Alemán Adulto',
        descripcion: 'Pastor Alemán de 2 años, entrenado y muy inteligente.',
        precio: 600,
        imagen: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 1,
        raza: 'Pastor Alemán',
        edad: '2 años',
        sexo: 'Macho',
        tamano: 'Grande',
        vacunado: true,
        esterilizado: true
      } as Mascota,
      {
        id: 102,
        nombre: 'Labrador Retriever Hembra',
        descripcion: 'Labrador chocolate muy cariñosa y juguetona.',
        precio: 700,
        imagen: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 1,
        raza: 'Labrador Retriever',
        edad: '1 año',
        sexo: 'Hembra',
        tamano: 'Grande',
        vacunado: true,
        esterilizado: false
      } as Mascota,
      {
        id: 103,
        nombre: 'Beagle Cachorro',
        descripcion: 'Adorable cachorro Beagle de 4 meses, perfecto para familias.',
        precio: 550,
        imagen: 'https://images.gestionaweb.cat/447/pwimg-1100/beagle-2.jpg',
        categoria: Categoria.MASCOTAS,
        stock: 3,
        raza: 'Beagle',
        edad: '4 meses',
        sexo: 'Macho',
        tamano: 'Mediano',
        vacunado: true,
        esterilizado: false
      } as Mascota,
      {
        id: 104,
        nombre: 'French Bulldog',
        descripcion: 'Bulldog Francés adulto, perfecto para apartamentos.',
        precio: 900,
        imagen: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 1,
        raza: 'French Bulldog',
        edad: '3 años',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: true,
        esterilizado: true
      } as Mascota,

      // GATOS
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
      {
        id: 105,
        nombre: 'Gato Siamés',
        descripcion: 'Hermoso gato Siamés, muy elegante y vocal.',
        precio: 400,
        imagen: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 2,
        raza: 'Siamés',
        edad: '1 año',
        sexo: 'Macho',
        tamano: 'Mediano',
        vacunado: true,
        esterilizado: false
      } as Mascota,
      {
        id: 106,
        nombre: 'Gato Maine Coon',
        descripcion: 'Maine Coon gigante, muy gentil y peludo.',
        precio: 800,
        imagen: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 1,
        raza: 'Maine Coon',
        edad: '4 años',
        sexo: 'Macho',
        tamano: 'Grande',
        vacunado: true,
        esterilizado: true
      } as Mascota,
      {
        id: 107,
        nombre: 'Gatito Común Europeo',
        descripcion: 'Gatito mestizo muy juguetón y cariñoso.',
        precio: 100,
        imagen: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 4,
        raza: 'Común Europeo',
        edad: '6 meses',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: true,
        esterilizado: false
      } as Mascota,

      // CONEJOS
      {
        id: 108,
        nombre: 'Conejo Holland Lop',
        descripcion: 'Adorable conejo enano con orejas caídas.',
        precio: 80,
        imagen: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 5,
        raza: 'Holland Lop',
        edad: '8 meses',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: true,
        esterilizado: false
      } as Mascota,
      {
        id: 109,
        nombre: 'Conejo Angora',
        descripcion: 'Conejo Angora con pelo largo y sedoso.',
        precio: 120,
        imagen: 'https://cdn0.expertoanimal.com/es/razas/0/8/6/conejo-angora_680_0_orig.jpg',
        categoria: Categoria.MASCOTAS,
        stock: 3,
        raza: 'Angora',
        edad: '1 año',
        sexo: 'Macho',
        tamano: 'Mediano',
        vacunado: true,
        esterilizado: true
      } as Mascota,
      {
        id: 110,
        nombre: 'Conejo Rex',
        descripcion: 'Conejo Rex con pelaje aterciopelado único.',
        precio: 90,
        imagen: 'https://cdn0.expertoanimal.com/es/razas/8/5/6/conejo-rex-mini_658_0_orig.jpg',
        categoria: Categoria.MASCOTAS,
        stock: 2,
        raza: 'Rex',
        edad: '6 meses',
        sexo: 'Hembra',
        tamano: 'Mediano',
        vacunado: true,
        esterilizado: false
      } as Mascota,

      // PECES
      {
        id: 111,
        nombre: 'Pez Betta Azul',
        descripcion: 'Hermoso pez Betta de colores vibrantes.',
        precio: 15,
        imagen: 'https://www.nascapers.es/wp-content/uploads/2023/09/pez-betta-Splendens-azul-nascapers.webp',
        categoria: Categoria.MASCOTAS,
        stock: 10,
        raza: 'Betta',
        edad: '6 meses',
        sexo: 'Macho',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 112,
        nombre: 'Peces Goldfish',
        descripcion: 'Par de goldfish naranjas para acuario.',
        precio: 25,
        imagen: 'https://escalaracuarios.com/wp-content/uploads/2023/03/20230226_083021.jpg',
        categoria: Categoria.MASCOTAS,
        stock: 8,
        raza: 'Goldfish',
        edad: '1 año',
        sexo: 'Macho',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 113,
        nombre: 'Peces Tropicales Neón',
        descripcion: 'Grupo de 5 peces neón para acuario tropical.',
        precio: 30,
        imagen: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 6,
        raza: 'Neón Tetra',
        edad: '8 meses',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,

      // IGUANAS Y REPTILES
      {
        id: 114,
        nombre: 'Iguana Verde Joven',
        descripcion: 'Iguana verde saludable, perfecta para principiantes.',
        precio: 200,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShUYQzSRI7reffMmevJbHVi4JF9Pf14cCeLw&s',
        categoria: Categoria.MASCOTAS,
        stock: 2,
        raza: 'Iguana Verde',
        edad: '1 año',
        sexo: 'Hembra',
        tamano: 'Mediano',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 115,
        nombre: 'Gecko Leopardo',
        descripcion: 'Gecko leopardo dócil y fácil de cuidar.',
        precio: 150,
        imagen: 'https://muchoreptil.wordpress.com/wp-content/uploads/2015/01/leopard-gecko.jpg',
        categoria: Categoria.MASCOTAS,
        stock: 3,
        raza: 'Gecko Leopardo',
        edad: '2 años',
        sexo: 'Macho',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 119,
        nombre: 'Tortuga de Orejas Rojas',
        descripcion: 'Tortuga acuática juvenil, perfecta para acuarios grandes.',
        precio: 80,
        imagen: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 4,
        raza: 'Trachemys scripta elegans',
        edad: '1 año',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 120,
        nombre: 'Tortuga Rusa',
        descripcion: 'Tortuga terrestre pequeña, ideal para principiantes.',
        precio: 120,
        imagen: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 2,
        raza: 'Testudo horsfieldii',
        edad: '2 años',
        sexo: 'Macho',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 121,
        nombre: 'Tortuga Mediterránea',
        descripcion: 'Tortuga terrestre mediterránea, longeva y resistente.',
        precio: 200,
        imagen: 'https://images.unsplash.com/photo-1602491673980-73aa38de027a?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 1,
        raza: 'Testudo hermanni',
        edad: '5 años',
        sexo: 'Hembra',
        tamano: 'Mediano',
        vacunado: false,
        esterilizado: false
      } as Mascota,

      // AVES
      {
        id: 116,
        nombre: 'Canario Amarillo',
        descripcion: 'Canario cantor con hermoso plumaje amarillo.',
        precio: 40,
        imagen: 'https://media.istockphoto.com/id/117008718/es/foto/amarillo-canario-serinus-canaria-en-su-ubicaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=xwFvjxOeSbtxLx-lIlgDp8_f6RzMXpImaxWR-yJXoqQ=',
        categoria: Categoria.MASCOTAS,
        stock: 6,
        raza: 'Canario',
        edad: '1 año',
        sexo: 'Macho',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 117,
        nombre: 'Periquito Australiano',
        descripcion: 'Periquito colorido y muy sociable.',
        precio: 35,
        imagen: 'https://www.vetcon.es/wp-content/uploads/2020/05/aves-PERIQUITO-AUSTRALIANO.jpg',
        categoria: Categoria.MASCOTAS,
        stock: 8,
        raza: 'Periquito',
        edad: '8 meses',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 118,
        nombre: 'Cacatúa Ninfa',
        descripcion: 'Cacatúa ninfa cariñosa con cresta distintiva.',
        precio: 180,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVfT487u-stlVU2OuahzZCpiLx-r2Hojq7MQ&s',
        categoria: Categoria.MASCOTAS,
        stock: 2,
        raza: 'Cacatúa Ninfa',
        edad: '2 años',
        sexo: 'Hembra',
        tamano: 'Mediano',
        vacunado: false,
        esterilizado: false
      } as Mascota,

      // ROEDORES
      {
        id: 122,
        nombre: 'Hámster Dorado Sirio',
        descripcion: 'Hámster dorado adulto, muy dócil y fácil de cuidar.',
        precio: 25,
        imagen: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 8,
        raza: 'Hámster Sirio Dorado',
        edad: '6 meses',
        sexo: 'Macho',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 123,
        nombre: 'Hámster Ruso Enano',
        descripcion: 'Pequeño hámster ruso, perfecto para principiantes.',
        precio: 20,
        imagen: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 10,
        raza: 'Hámster Ruso',
        edad: '4 meses',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 124,
        nombre: 'Hámster Chino Rayado',
        descripcion: 'Hámster chino con características rayas dorsales.',
        precio: 30,
        imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 5,
        raza: 'Hámster Chino',
        edad: '5 meses',
        sexo: 'Macho',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 125,
        nombre: 'Chinchilla Gris Estándar',
        descripcion: 'Chinchilla de pelo suave y denso, muy activa.',
        precio: 150,
        imagen: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 3,
        raza: 'Chinchilla Lanigera',
        edad: '1 año',
        sexo: 'Hembra',
        tamano: 'Mediano',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 126,
        nombre: 'Hámster Roborovski',
        descripcion: 'El hámster más pequeño del mundo, muy activo y rápido.',
        precio: 35,
        imagen: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 6,
        raza: 'Roborovski',
        edad: '3 meses',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 127,
        nombre: 'Hámster Campbell',
        descripcion: 'Hámster Campbell sociable, ideal para tener en parejas.',
        precio: 28,
        imagen: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 12,
        raza: 'Campbell',
        edad: '5 meses',
        sexo: 'Macho',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,
      {
        id: 128,
        nombre: 'Jerbo del Desierto',
        descripcion: 'Roedor saltarín del desierto, muy curioso y activo.',
        precio: 45,
        imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        categoria: Categoria.MASCOTAS,
        stock: 4,
        raza: 'Jerbo Mongol',
        edad: '8 meses',
        sexo: 'Hembra',
        tamano: 'Pequeño',
        vacunado: false,
        esterilizado: false
      } as Mascota,

      // Alimentación
      {
        id: 3,
        nombre: 'Alimento Premium para Perros',
        descripcion: 'Alimento balanceado premium para perros adultos. Bolsa de 15kg.',
        precio: 25,
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
        precio: 38.99,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSih6Ww0HDXukp9eNbNFdYnzojJ4lQ2HYWwGg&s',
        categoria: Categoria.ALIMENTACION,
        stock: 20
      },

      // Accesorios
      {
        id: 5,
        nombre: 'Collar Ajustable',
        descripcion: 'Collar ajustable de nylon resistente con hebilla de seguridad.',
        precio: 1.5,
        imagen: 'https://mascoboutique.com/18351-superlarge_default/collar-para-perro-flores-mini.jpg',
        categoria: Categoria.ACCESORIOS,
        stock: 50
      },
      {
        id: 6,
        nombre: 'Cama para Mascotas',
        descripcion: 'Cama cómoda y lavable para perros y gatos medianos.',
        precio: 25,
        imagen: 'https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8435599606753_1.jpg',
        categoria: Categoria.ACCESORIOS,
        stock: 15
      },

      // Juguetes
      {
        id: 7,
        nombre: 'Pelota de Goma',
        descripcion: 'Pelota resistente para perros, ideal para juegos al aire libre.',
        precio: 1,
        imagen: 'https://www.mascotaplanet.com/60390-large_default/pelota-de-goma-con-puntas-para-perros.jpg',
        categoria: Categoria.JUGUETES,
        stock: 30
      },
      {
        id: 8,
        nombre: 'Ratón de Juguete para Gatos',
        descripcion: 'Ratón de peluche con hierba gatera para entretenimiento felino.',
        precio: 3,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVGt7TtaGpbkiWaO-1VqpBzYuzmpm6OMSxSQ&s',
        categoria: Categoria.JUGUETES,
        stock: 40
      },

      // Higiene
      {
        id: 9,
        nombre: 'Champú para Mascotas',
        descripcion: 'Champú suave y natural para el cuidado del pelaje de tu mascota.',
        precio: 8,
        imagen: 'https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8719138820191_1.jpg',
        categoria: Categoria.HIGIENE,
        stock: 25
      },
      {
        id: 10,
        nombre: 'Cepillo de Dientes para Mascotas',
        descripcion: 'Kit completo de higiene dental para mascotas pequeñas y medianas.',
        precio: 2.2,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv82ETqIL8NHjDCOQEPVJ2shyNkzaoQNBu1w&s',
        categoria: Categoria.HIGIENE,
        stock: 15
      }
    ];

    // Guardar los productos iniciales en localStorage y actualizar el Subject
    this.actualizarYGuardar(productos);
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

  // Método más directo para obtener mascotas por tipo
  obtenerMascotasPorTipo(tipo: string): Observable<Producto[]> {
    const productos = this.productosSubject.value;
    const mascotas = productos.filter(p => p.categoria === Categoria.MASCOTAS);

    switch(tipo.toLowerCase()) {
      case 'perros':
        return of(mascotas.filter(m => this.esPerro(m)));
      case 'gatos':
        return of(mascotas.filter(m => this.esGato(m)));
      case 'conejos':
        return of(mascotas.filter(m => this.esConejo(m)));
      case 'peces':
        return of(mascotas.filter(m => this.esPez(m)));
      case 'iguanas':
      case 'reptiles':
      case 'tortugas':
        return of(mascotas.filter(m => this.esReptil(m)));
      case 'roedores':
      case 'hamsters':
        console.log('Buscando roedores. Total mascotas:', mascotas.length);
        const roedores = mascotas.filter(m => this.esRoedor(m));
        console.log('Roedores encontrados:', roedores);
        return of(roedores);
      case 'aves':
        return of(mascotas.filter(m => this.esAve(m)));
      default:
        return of(mascotas);
    }
  }

  private esPerro(mascota: Producto): boolean {
    const nombre = mascota.nombre.toLowerCase();
    const desc = mascota.descripcion.toLowerCase();
    const raza = (mascota as any).raza?.toLowerCase() || '';

    return nombre.includes('perro') || nombre.includes('cachorro') ||
           desc.includes('perro') || desc.includes('cachorro') ||
           raza.includes('retriever') || raza.includes('pastor') ||
           raza.includes('labrador') || raza.includes('beagle') || raza.includes('bulldog');
  }

  private esGato(mascota: Producto): boolean {
    const nombre = mascota.nombre.toLowerCase();
    const desc = mascota.descripcion.toLowerCase();
    const raza = (mascota as any).raza?.toLowerCase() || '';

    return nombre.includes('gato') || nombre.includes('gatito') ||
           desc.includes('gato') || desc.includes('felino') ||
           raza.includes('persa') || raza.includes('siamés') || raza.includes('maine');
  }

  private esConejo(mascota: Producto): boolean {
    const nombre = mascota.nombre.toLowerCase();
    const desc = mascota.descripcion.toLowerCase();
    const raza = (mascota as any).raza?.toLowerCase() || '';

    return nombre.includes('conejo') || desc.includes('conejo') ||
           raza.includes('holland') || raza.includes('angora') || raza.includes('rex');
  }

  private esPez(mascota: Producto): boolean {
    const nombre = mascota.nombre.toLowerCase();
    const desc = mascota.descripcion.toLowerCase();
    const raza = (mascota as any).raza?.toLowerCase() || '';

    return nombre.includes('pez') || nombre.includes('peces') ||
           desc.includes('pez') || raza.includes('betta') ||
           raza.includes('goldfish') || raza.includes('neón');
  }

  private esReptil(mascota: Producto): boolean {
    const nombre = mascota.nombre.toLowerCase();
    const desc = mascota.descripcion.toLowerCase();
    const raza = (mascota as any).raza?.toLowerCase() || '';

    return nombre.includes('iguana') || nombre.includes('gecko') ||
           nombre.includes('tortuga') || desc.includes('iguana') ||
           desc.includes('reptil') || desc.includes('tortuga') ||
           desc.includes('acuática') || desc.includes('terrestre') ||
           raza.includes('iguana') || raza.includes('gecko') ||
           raza.includes('testudo') || raza.includes('trachemys');
  }

  private esRoedor(mascota: Producto): boolean {
    const nombre = mascota.nombre.toLowerCase();
    const desc = mascota.descripcion.toLowerCase();
    const raza = (mascota as any).raza?.toLowerCase() || '';

    const esRoedor = nombre.includes('hámster') || nombre.includes('hamster') ||
           nombre.includes('chinchilla') || nombre.includes('jerbo') ||
           nombre.includes('ratón') || nombre.includes('roedor') ||
           desc.includes('hámster') || desc.includes('hamster') ||
           desc.includes('chinchilla') || desc.includes('jerbo') ||
           desc.includes('ratón') || desc.includes('roedor') ||
           desc.includes('dócil') || desc.includes('pequeño') ||
           raza.includes('hámster') || raza.includes('hamster') ||
           raza.includes('dorado') || raza.includes('ruso') ||
           raza.includes('chino') || raza.includes('sirio') ||
           raza.includes('chinchilla') || raza.includes('jerbo');

    if (esRoedor) {
      console.log(`${mascota.nombre} es un roedor`);
    }

    return esRoedor;
  }

  private esAve(mascota: Producto): boolean {
    const nombre = mascota.nombre.toLowerCase();
    const desc = mascota.descripcion.toLowerCase();
    const raza = (mascota as any).raza?.toLowerCase() || '';

    return nombre.includes('canario') || nombre.includes('periquito') ||
           nombre.includes('cacatúa') || desc.includes('ave') ||
           raza.includes('canario') || raza.includes('periquito');
  }

  buscarProductos(termino: string): Observable<Producto[]> {
    const productos = this.productosSubject.value;
    const productosFiltrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(termino.toLowerCase())
    );
    return of(productosFiltrados);
  }

  // Métodos CRUD para administradores

  // Crear nuevo producto
  crearProducto(producto: Omit<Producto, 'id'>): Observable<Producto> {
    const productos = this.productosSubject.value;
    const nuevoId = Math.max(...productos.map(p => p.id)) + 1;
    const nuevoProducto: Producto = {
      ...producto,
      id: nuevoId
    };

    const productosActualizados = [...productos, nuevoProducto];
    this.actualizarYGuardar(productosActualizados);

    return of(nuevoProducto);
  }

  // Actualizar producto existente
  actualizarProducto(id: number, productosActualizado: Partial<Producto>): Observable<Producto | null> {
    const productos = this.productosSubject.value;
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
      return of(null);
    }

    const producto = productos[index];
    const productoActualizado = { ...producto, ...productosActualizado, id };

    const productosActualizados = [...productos];
    productosActualizados[index] = productoActualizado;
    this.actualizarYGuardar(productosActualizados);

    return of(productoActualizado);
  }

  // Métodos para LocalStorage
  private cargarDesdeLocalStorage(): Producto[] {
    try {
      const productosJson = localStorage.getItem(this.STORAGE_KEY);
      if (productosJson) {
        return JSON.parse(productosJson);
      }
    } catch (error) {
      console.error('Error al cargar productos desde localStorage:', error);
    }
    return [];
  }

  private guardarEnLocalStorage(productos: Producto[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productos));
    } catch (error) {
      console.error('Error al guardar productos en localStorage:', error);
    }
  }

  private actualizarYGuardar(productos: Producto[]): void {
    this.productosSubject.next(productos);
    this.guardarEnLocalStorage(productos);
  }

  // Eliminar producto
  eliminarProducto(id: number): Observable<boolean> {
    const productos = this.productosSubject.value;
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
      return of(false);
    }

    const productosActualizados = productos.filter(p => p.id !== id);
    this.actualizarYGuardar(productosActualizados);

    return of(true);
  }

  // Obtener siguiente ID disponible
  obtenerSiguienteId(): number {
    const productos = this.productosSubject.value;
    return productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  }

  // Limpiar localStorage y recargar datos iniciales
  resetearProductos(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.cargarDatosDesdeJSON();
  }

  // Método para exportar datos (útil para backup)
  exportarProductos(): string {
    return JSON.stringify(this.productosSubject.value, null, 2);
  }
}
