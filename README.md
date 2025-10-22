# � Tienda de Mascotas Angular

## 📋 Descripción del Proyecto

**Tienda de Mascotas Angular** es una aplicación web completa de e-commerce especializada en la venta de mascotas, alimentos, accesorios y productos para el cuidado de animales. Desarrollada con **Angular 19**, **Bootstrap 5** y **TypeScript**, implementa un sistema completo de roles, gestión de productos, carrito de compras y administración.

## 🚀 Funcionalidades Principales

### 🔐 Sistema de Autenticación y Roles

- **Tres tipos de usuarios:**
  - **👑 Administrador (ADMIN)**: Acceso completo al sistema
  - **🛍️ Cliente (CLIENTE)**: Puede ver productos y realizar compras
  - **👤 No Registrado (NO_REGISTRADO)**: Solo visualización limitada

- **Funcionalidades por rol:**
  ```typescript
  // Permisos del Administrador
  - ✅ Crear, editar, eliminar productos (CRUD completo)
  - ✅ Gestionar usuarios registrados
  - ✅ Acceder al panel de administración
  - ✅ Ver estadísticas del sistema
  - ✅ Gestionar todas las categorías y subcategorías

  // Permisos del Cliente
  - ✅ Ver catálogo de productos
  - ✅ Agregar productos al carrito
  - ✅ Ver detalles de productos
  - ✅ Navegar por categorías específicas
  - ❌ No puede crear/editar productos

  // Usuario No Registrado
  - ✅ Ver productos (solo lectura)
  - ❌ No puede agregar al carrito
  - ❌ No puede acceder a funciones de compra
  ```
### � Catálogo de Productos con Subcategorías

#### 📦 Categorías Principales:
1. **🐕 Mascotas** - Subcategorías especializadas:
   - **Perros**: Golden Retriever, Pastor Alemán, Labrador, Beagle, French Bulldog
   - **Gatos**: Persa, Siamés, Maine Coon, Común Europeo
   - **Conejos**: Holland Lop, Angora, Rex
   - **Peces**: Betta, Goldfish, Neón Tetra
   - **Iguanas/Reptiles**: Iguana Verde, Gecko Leopardo
   - **Aves**: Canarios, Periquitos, Cacatúa Ninfa

2. **🍖 Alimentación**: Productos alimenticios para cada tipo de mascota
3. **🎾 Juguetes**: Entretenimiento y estimulación
4. **🧼 Higiene**: Productos de limpieza y cuidado
5. **👕 Accesorios**: Collares, camas, transportadoras

#### 🔍 Sistema de Filtrado Inteligente:
```typescript
// Ejemplo: Filtro para perros
productos.filter((p: Producto) => {
  return nombre.includes('perro') ||
         nombre.includes('cachorro') ||
         raza.includes('retriever') ||
         raza.includes('pastor') ||
         // ... más criterios específicos
});
```

### 🛒 Carrito de Compras Avanzado

- **Funcionalidades:**
  - ➕ Agregar productos con cantidad personalizable
  - 🔢 Modificar cantidades directamente
  - 🗑️ Eliminar productos individuales
  - 🧹 Limpiar carrito completo
  - 💰 Cálculo automático de totales
  - 💾 Persistencia con localStorage

```typescript
// Métodos principales del CarritoService
agregarProducto(producto: Producto, cantidad: number = 1)
actualizarCantidad(productoId: number, cantidad: number)
eliminarProducto(productoId: number)
limpiarCarrito()
obtenerTotal(): number
```

### 👨‍� Panel de Administración

#### 📊 Dashboard con Estadísticas:
- 👥 Total de usuarios registrados
- 🛍️ Clientes activos
- 📦 Total de productos en inventario
- 📈 Ventas del mes

#### 🏗️ Gestión de Productos (CRUD):
- **✨ Crear Productos**: Formulario completo con validaciones
- **📝 Editar Productos**: Modificación de datos existentes
- **👁️ Ver Productos**: Lista detallada con filtros
- **🗑️ Eliminar Productos**: Confirmación de seguridad

#### 📋 Formulario de Productos Inteligente:
```html
<!-- Campos dinámicos según el tipo de producto -->
<div *ngIf="productForm.get('categoria')?.value === 'MASCOTAS'">
  <!-- Subcategoría específica -->
  <select formControlName="subcategoria">
    <option value="perros">Perros</option>
    <option value="gatos">Gatos</option>
    <!-- ... más opciones -->
  </select>
  
  <!-- Campos específicos para mascotas -->
  <input formControlName="raza" placeholder="Raza">
  <input formControlName="edad" placeholder="Edad">
  <select formControlName="sexo">
    <option value="Macho">Macho</option>
    <option value="Hembra">Hembra</option>
  </select>
</div>
```

### 💾 Persistencia de Datos

#### 🔄 Sistema de Almacenamiento Local:
```typescript
// Métodos de persistencia en ProductoService
private guardarEnLocalStorage(): void {
  localStorage.setItem('productos', JSON.stringify(this.productosSubject.value));
}

private cargarDesdeLocalStorage(): Producto[] {
  const productosGuardados = localStorage.getItem('productos');
  return productosGuardados ? JSON.parse(productosGuardados) : [];
}

// Los productos se mantienen después de recargar la página
// Ideal para desarrollo y testing
```

### 🎨 Interfaz de Usuario Moderna

#### 🎭 Características de Diseño:
- **📱 Responsive**: Compatible con móviles, tablets y desktop
- **🎨 Bootstrap 5**: Componentes modernos y consistentes
- **🌈 Iconos Font Awesome**: Iconografía profesional
- **⚡ Animaciones CSS**: Transiciones suaves
- **🎪 Gradientes de Color**: Diferenciación visual por categoría

## 🏗️ Arquitectura del Proyecto

### 📁 Estructura de Carpetas:
```
mascotas/
├── src/
│   ├── app/
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── admin-panel/      # Panel de administración
│   │   │   ├── carrito/          # Gestión del carrito
│   │   │   ├── catalogo/         # Catálogo de productos
│   │   │   ├── login/           # Autenticación
│   │   │   ├── navbar/          # Navegación principal
│   │   │   ├── producto-detalle/ # Vista detallada de producto
│   │   │   ├── producto-form/    # Formulario CRUD de productos
│   │   │   └── register/        # Registro de usuarios
│   │   │
│   │   ├── pages/               # Páginas principales
│   │   │   ├── mascotas/        # Categoría mascotas
│   │   │   │   ├── perros/      # Subcategoría perros
│   │   │   │   ├── gatos/       # Subcategoría gatos
│   │   │   │   ├── conejos/     # Subcategoría conejos
│   │   │   │   ├── peces/       # Subcategoría peces
│   │   │   │   ├── iguanas/     # Subcategoría reptiles
│   │   │   │   └── aves/        # Subcategoría aves
│   │   │   ├── alimentacion/    # Productos alimenticios
│   │   │   ├── accesorios/      # Accesorios para mascotas
│   │   │   ├── juguetes/        # Juguetes
│   │   │   └── higiene/         # Productos de higiene
│   │   │
│   │   ├── services/            # Servicios de negocio
│   │   │   ├── auth.service.ts      # Autenticación y roles
│   │   │   ├── carrito.service.ts   # Gestión del carrito
│   │   │   └── producto.service.ts  # CRUD de productos
│   │   │
│   │   ├── models/              # Modelos de datos
│   │   │   ├── producto.model.ts    # Definición de productos
│   │   │   └── usuario.model.ts     # Definición de usuarios
│   │   │
│   │   ├── guards/              # Protección de rutas
│   │   │   └── role.guard.ts        # Control de acceso por roles
│   │   │
│   │   └── assets/              # Recursos estáticos
│   │       └── data/
│   │           └── productos.json   # Datos iniciales
│   │
│   ├── styles.css              # Estilos globales
│   └── main.ts                # Punto de entrada
```

### 🔧 Tecnologías Utilizadas:

#### Frontend:
- **⚡ Angular 19.0.0**: Framework principal
- **📘 TypeScript 5.6.2**: Lenguaje de programación
- **🎨 Bootstrap 5.3.8**: Framework CSS
- **🎭 Font Awesome 6.4.0**: Iconografía
- **🔄 RxJS 7.8.0**: Programación reactiva

### 🚀 Casos de Uso Principales

#### 👑 Como Administrador:
1. **Inicio de sesión** con credenciales de admin
2. **Acceso al panel** de administración
3. **Creación de productos** con formulario completo
4. **Gestión del inventario** (editar, eliminar productos)
5. **Monitoreo de estadísticas** del sistema

#### 🛍️ Como Cliente:
1. **Navegación libre** por el catálogo
2. **Filtrado por categorías** específicas (perros, gatos, etc.)
3. **Vista detallada** de productos
4. **Agregar al carrito** con cantidades personalizadas
5. **Gestión del carrito** (modificar, eliminar items)

### 🛠️ Instalación y Uso:
```bash
# 1. Navegar al directorio del proyecto
cd tienda_mascotas_angular/mascotas

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
ng serve

# 4. Abrir en navegador
http://localhost:4200
```

## 📝 Documentación del Código

### 💬 **Comentarios Detallados en el Código**

Todos los archivos TypeScript y HTML incluyen comentarios extensos que explican:

#### 🔧 **En archivos .TS (TypeScript):**
```typescript
/**
 * 🐕 COMPONENTE PERROS - Comentario de encabezado
 * 
 * PROPÓSITO: Explica para qué sirve el componente
 * FUNCIONALIDADES: Lista de características implementadas
 * ROLES: Qué usuarios pueden acceder y qué pueden hacer
 */

// 📊 PROPIEDADES DEL COMPONENTE
/** Lista completa de productos cargados desde la base de datos */
productos: Producto[] = [];

// 🔧 INYECCIÓN DE DEPENDENCIAS  
constructor(
  /** Servicio para obtener productos de la base de datos/localStorage */
  private productoService: ProductoService
) {}

// 🚀 CICLO DE VIDA: Se ejecuta cuando el componente se inicializa
ngOnInit(): void {
  this.cargarProductos(); // Carga los productos al iniciar
}
```

#### 🎨 **En archivos .HTML (Templates):**
```html
<!-- 
🐕 PÁGINA DE PERROS - VISTA HTML
PROPÓSITO: Mostrar catálogo exclusivo de perros
FUNCIONALIDADES: Filtros, ordenamiento, carrito
ROLES: Diferentes acciones según usuario
-->

<!-- 🎨 HERO SECTION: Banner principal con branding -->
<div class="bg-gradient-primary">
  <!-- 📝 Two-way binding con ngModel -->
  <select [(ngModel)]="filtroOrden" (change)="onFiltroChange()">
  
  <!-- 🔀 *ngIf estructural: Muestra SI hay productos -->
  <div *ngIf="productosFiltrados.length > 0">
```

### 📋 **Archivos Completamente Documentados:**

#### 🧩 **Componentes:**
- ✅ **PerrosComponent**: Catálogo específico de perros con filtros
- ✅ **GatosComponent**: Catálogo específico de gatos  
- ✅ **AdminPanelComponent**: Panel de control para administradores
- ✅ **ProductoDetalleComponent**: Vista detallada de productos
- ✅ **CarritoComponent**: Gestión del carrito de compras

#### 🔧 **Servicios:**
- ✅ **ProductoService**: CRUD de productos + persistencia localStorage
- ✅ **AuthService**: Autenticación y control de roles
- ✅ **CarritoService**: Gestión del carrito de compras

#### 📊 **Modelos:**
- ✅ **producto.model.ts**: Interfaces Producto y Mascota + enum Categoria
- ✅ **usuario.model.ts**: Interfaces Usuario, tipos de roles y permisos

#### 🛡️ **Guards:**
- ✅ **RoleGuard**: Protección de rutas por roles de usuario

### 🎯 **Tipos de Comentarios Incluidos:**

#### 📚 **Comentarios de Documentación:**
- **Propósito** de cada archivo/componente
- **Funcionalidades** implementadas  
- **Roles y permisos** de acceso
- **Casos de uso** principales

#### 🔧 **Comentarios Técnicos:**
- **Inyección de dependencias** explicada
- **Ciclos de vida** de Angular
- **Binding de datos** (property, event, two-way)
- **Directivas estructurales** (*ngIf, *ngFor)
- **Observables y RxJS**

#### 💡 **Comentarios Explicativos:**
- **Por qué** se usa cada patrón
- **Cómo** funciona cada método
- **Para qué** sirve cada propiedad
- **Cuándo** se ejecuta cada función

### 🔍 **Ejemplo de Documentación Completa:**

```typescript
/**
 * 🔐 AUTH SERVICE - Servicio de Autenticación
 * PROPÓSITO: Maneja login/logout y control de roles
 * FUNCIONALIDADES: 
 * - 🔑 Login/logout de usuarios
 * - 👥 Gestión de roles (Admin/Cliente/No Registrado)  
 * - 🛡️ Control de acceso por permisos
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  
  // 👤 USUARIO ACTUAL: Mantiene el estado del usuario logueado
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  
  // 🔄 OBSERVABLE PÚBLICO: Para reactividad en componentes
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // 🔐 CONTROL DE ACCESO: Verifica si el usuario es admin
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.rol === TipoUsuario.ADMIN;
  }
}
```

---

## 👨‍💻 Desarrollado por

**Leticia Orive** con la asistencia de **GitHub Copilot**

*⭐ Este proyecto representa una implementación completa de e-commerce con Angular, demostrando buenas prácticas de desarrollo, arquitectura modular, experiencia de usuario moderna, y documentación exhaustiva del código! 🚀*
Animaciones divertidas y efectos hover
Colores azules vibrantes
Información sobre beneficios del juego
🛁 Página de Higiene
Diseño limpio con efectos sutiles
Colores grises/plateados
Enfoque en ingredientes naturales y cuidado
💫 Funcionalidades Avanzadas
Gestión inteligente del carrito: Muestra si el producto ya está en el carrito y la cantidad
Badges informativos: Estado de ofertas, stock, características especiales
Botones dinámicos: Cambian según el stock disponible
Diseño responsive: Optimizado para todos los dispositivos
Animaciones CSS: Efectos hover únicos por categoría
🎯 Mejoras en UX/UI
Hero sections personalizadas por categoría con gradientes únicos
Cards elevadas con efectos de hover
Información contextual específica para cada tipo de producto
Estilos CSS personalizados para cada página
Iconografía coherente con Font Awesome
⚡ Rendimiento y Código
TypeScript estricto con tipado completo
Componentes reactivos con RxJS
Gestión de estado optimizada
Imports organizados con FormsModule para búsquedas
Compilación exitosa sin errores
La aplicación ahora tiene un nivel profesional con todas las funcionalidades que implementaste, manteniendo la estructura original pero añadiendo estas mejoras significativas.