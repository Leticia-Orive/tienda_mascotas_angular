export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro: Date;
  rol: TipoUsuario;
  activo: boolean;
}

export enum TipoUsuario {
  ADMIN = 'admin',
  CLIENTE = 'cliente',
  NO_REGISTRADO = 'no_registrado'
}

export interface PermisoUsuario {
  puedeVerPanel: boolean;
  puedeGestionarProductos: boolean;
  puedeGestionarUsuarios: boolean;
  puedeComprar: boolean;
  puedeVerHistorial: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
  telefono?: string;
  direccion?: string;
  rol?: TipoUsuario; // Por defecto será CLIENTE
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}
