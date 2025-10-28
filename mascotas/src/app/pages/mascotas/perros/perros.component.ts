/**
 * 🐕 COMPONENTE PERROS
 *
 * PROPÓSITO:
 * - Mostrar exclusivamente productos de la subcategoría "Perros"
 * - Filtrar mascotas por razas caninas específicas
 * - Permitir a los clientes ver y comprar perros disponibles
 *
 * FUNCIONALIDADES:
 * - ✅ Carga productos desde ProductoService
 * - ✅ Filtra solo perros usando múltiples criterios (nombre, raza, descripción)
 * - ✅ Ordenamiento por nombre y precio (ascendente/descendente)
 * - ✅ Integración con carrito de compras para clientes
 * - ✅ Control de acceso según rol de usuario
 * - ✅ Interfaz responsive con Bootstrap
 *
 * ROLES QUE PUEDEN ACCEDER:
 * - 👑 Admin: Ve todos los perros + puede gestionarlos
 * - 🛍️ Cliente: Ve perros + puede agregarlos al carrito
 * - 👤 No registrado: Solo visualización
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { CarritoService } from '../../../services/carrito.service';
import { AuthService } from '../../../services/auth.service';
import { Producto, Categoria } from '../../../models/producto.model';

@Component({
  selector: 'app-perros', // Selector único para identificar este componente
  imports: [
    CommonModule,  // Directivas básicas de Angular (*ngFor, *ngIf, etc.)
    RouterModule,  // Para navegación entre páginas (routerLink)
    FormsModule    // Para formularios y ngModel (filtros)
  ],
  templateUrl: './perros.component.html',
  styleUrl: './perros.component.css'
})
export class PerrosComponent implements OnInit {

  // 📊 PROPIEDADES DEL COMPONENTE

  /** Lista completa de productos de perros cargados desde la base de datos */
  productos: Producto[] = [];

  /** Lista filtrada y ordenada que se muestra en el HTML */
  productosFiltrados: Producto[] = [];

  /** Criterio de ordenamiento seleccionado por el usuario */
  filtroOrden = 'nombre'; // Valores: 'nombre', 'precio-asc', 'precio-desc'

  // 🔧 INYECCIÓN DE DEPENDENCIAS
  constructor(
    /** Servicio para obtener productos de la base de datos/localStorage */
    private productoService: ProductoService,

    /** Servicio para manejar el carrito de compras */
    private carritoService: CarritoService,

    /** Servicio público para verificar roles y permisos en el HTML */
    public authService: AuthService
  ) {}

  // 🚀 CICLO DE VIDA: Se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.cargarProductos(); // Carga los productos al iniciar la página
  }

  // 📥 CARGA DE DATOS: Obtiene solo productos de perros del servicio
  cargarProductos(): void {
    // Usa el método especializado del servicio que filtra automáticamente por 'perros'
    this.productoService.obtenerMascotasPorTipo('perros').subscribe((productos: Producto[]) => {
      this.productos = productos;  // Guarda la lista completa
      this.aplicarFiltros();       // Aplica ordenamiento inicial
    });
  }

  // 🔄 FILTRADO Y ORDENAMIENTO: Organiza los productos según la selección del usuario
  aplicarFiltros(): void {
    // Crea una copia para no modificar el array original
    let productosOrdenados = [...this.productos];

    // Aplica el ordenamiento seleccionado por el usuario
    switch (this.filtroOrden) {
      case 'precio-asc':
        // Ordena de menor a mayor precio
        productosOrdenados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        // Ordena de mayor a menor precio
        productosOrdenados.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
      default:
        // Ordena alfabéticamente por nombre (A-Z)
        productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }

    // Actualiza la lista que se muestra en el HTML
    this.productosFiltrados = productosOrdenados;
  }

  // 🎭 EVENT HANDLER: Se ejecuta cuando el usuario cambia el filtro de ordenamiento
  onFiltroChange(): void {
    this.aplicarFiltros(); // Reaplica los filtros con el nuevo criterio
  }

  // 🛒 CARRITO: Agrega un perro al carrito (solo clientes autenticados)
  agregarAlCarrito(producto: Producto): void {
    // Verifica que el usuario sea cliente antes de permitir la acción
    if (this.authService.isCliente()) {
      this.carritoService.agregarProducto(producto);
    }
  }

  // 🔐 CONTROL DE ACCESO: Verifica si el usuario puede agregar al carrito
  puedeAgregarAlCarrito(): boolean {
    return this.authService.isCliente(); // Solo clientes pueden comprar
  }

  // 🏷️ HELPER METHODS: Métodos auxiliares para acceder a propiedades específicas de mascotas
  // Estos métodos permiten acceder a propiedades del tipo Mascota de forma type-safe

  /** Obtiene la raza del perro (ej: "Golden Retriever", "Pastor Alemán") */
  getMascotaRaza(producto: Producto): string | undefined {
    return (producto as any).raza;
  }

  /** Obtiene la edad del perro (ej: "3 meses", "2 años") */
  getMascotaEdad(producto: Producto): string | undefined {
    return (producto as any).edad;
  }

  /** Obtiene el sexo del perro ("Macho" o "Hembra") */
  getMascotaSexo(producto: Producto): string | undefined {
    return (producto as any).sexo;
  }

  /** Obtiene el tamaño del perro ("Pequeño", "Mediano", "Grande") */
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
