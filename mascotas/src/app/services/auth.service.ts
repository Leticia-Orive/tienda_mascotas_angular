import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Usuario, LoginRequest, RegisterRequest, AuthResponse } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  // Simulación de base de datos de usuarios
  private usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Admin',
      apellido: 'Sistema',
      email: 'admin@tienda.com',
      telefono: '123456789',
      direccion: 'Calle Principal 123',
      fechaRegistro: new Date('2024-01-01')
    }
  ];

  // Simulación de contraseñas (en producción esto estaría en el backend)
  private credenciales = new Map<string, string>([
    ['admin@tienda.com', 'admin123']
  ]);

  constructor() {
    // Verificar si hay un usuario en localStorage al inicializar
    const usuarioGuardado = localStorage.getItem('currentUser');
    if (usuarioGuardado) {
      this.currentUserSubject.next(JSON.parse(usuarioGuardado));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    const { email, password } = credentials;

    // Simular verificación de credenciales
    const passwordCorrecta = this.credenciales.get(email);

    if (!passwordCorrecta || passwordCorrecta !== password) {
      return throwError(() => new Error('Credenciales inválidas'));
    }

    const usuario = this.usuarios.find(u => u.email === email);

    if (!usuario) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    const response: AuthResponse = {
      token: this.generateToken(),
      usuario: usuario
    };

    // Simular delay de red
    return of(response).pipe(
      delay(1000),
      map(response => {
        // Guardar usuario en localStorage y actualizar estado
        localStorage.setItem('currentUser', JSON.stringify(response.usuario));
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.usuario);
        return response;
      })
    );
  }

  register(registerData: RegisterRequest): Observable<AuthResponse> {
    const { nombre, apellido, email, password, confirmPassword, telefono, direccion } = registerData;

    // Validaciones
    if (password !== confirmPassword) {
      return throwError(() => new Error('Las contraseñas no coinciden'));
    }

    if (this.usuarios.some(u => u.email === email)) {
      return throwError(() => new Error('El email ya está registrado'));
    }

    // Crear nuevo usuario
    const nuevoUsuario: Usuario = {
      id: this.usuarios.length + 1,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      fechaRegistro: new Date()
    };

    // Agregar a la "base de datos" simulada
    this.usuarios.push(nuevoUsuario);
    this.credenciales.set(email, password);

    const response: AuthResponse = {
      token: this.generateToken(),
      usuario: nuevoUsuario
    };

    // Simular delay de red
    return of(response).pipe(
      delay(1000),
      map(response => {
        // Guardar usuario en localStorage y actualizar estado
        localStorage.setItem('currentUser', JSON.stringify(response.usuario));
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.usuario);
        return response;
      })
    );
  }

  logout(): void {
    // Limpiar localStorage y actualizar estado
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  private generateToken(): string {
    // Generar un token simple (en producción usar JWT)
    return 'token_' + Math.random().toString(36).substr(2, 9);
  }
}
