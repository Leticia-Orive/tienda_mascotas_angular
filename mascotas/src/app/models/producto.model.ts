/**
 * 📦 MODELOS DE PRODUCTOS - Definiciones TypeScript
 * ================================================
 *
 * PROPÓSITO:
 * - 🏗️ Define la estructura de datos para todos los productos
 * - 🎯 Proporciona tipado estricto (Type Safety)
 * - 🔄 Permite extensibilidad con herencia de interfaces
 * - 📋 Categoriza productos por tipo
 *
 * JERARQUÍA:
 * Producto (base) → Mascota (especializada para animales)
 */

/**
 * 🛍️ INTERFAZ PRODUCTO - Estructura base para todos los productos
 * Define las propiedades comunes que todo producto debe tener
 */
export interface Producto {
  id: number;                    // Identificador único
  nombre: string;                // Nombre del producto/mascota
  descripcion: string;           // Descripción detallada
  precio: number;                // Precio base en dólares
  imagen: string;                // URL de la imagen
  categoria: Categoria;          // Categoría principal (enum)
  subcategoria?: string;         // Subcategoría opcional (ej: 'perros', 'gatos')
  stock: number;                 // Cantidad disponible
  enOferta?: boolean;            // Si está en oferta (opcional)
  precioOferta?: number;         // Precio con descuento (opcional)
}

/**
 * 🐕 INTERFAZ MASCOTA - Extiende Producto con propiedades específicas de animales
 * Hereda todas las propiedades de Producto y agrega campos específicos
 */
export interface Mascota extends Producto {
  raza: string;                          // Raza del animal (ej: "Golden Retriever")
  edad: string;                          // Edad descriptiva (ej: "3 meses", "2 años")
  sexo: 'Macho' | 'Hembra';            // Género del animal (union type)
  tamano: 'Pequeño' | 'Mediano' | 'Grande'; // Tamaño del animal (union type)
  vacunado: boolean;                     // Estado de vacunación
  esterilizado: boolean;                 // Estado de esterilización
}

/**
 * 📋 ENUM CATEGORIA - Categorías principales de productos
 * Define las 5 categorías principales de la tienda
 */
export enum Categoria {
  MASCOTAS = 'mascotas',           // Animales para compra
  ALIMENTACION = 'alimentacion',   // Comida y suplementos
  ACCESORIOS = 'accesorios',       // Collares, correas, camas, etc.
  JUGUETES = 'juguetes',           // Entretenimiento para mascotas
  HIGIENE = 'higiene'              // Productos de limpieza y cuidado
}
