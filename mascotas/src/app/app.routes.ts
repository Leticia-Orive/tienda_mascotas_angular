import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { JuguetesComponent } from './pages/juguetes/juguetes.component';
import { HigieneComponent } from './pages/higiene/higiene.component';

export const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'alimentacion', component: AlimentacionComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'juguetes', component: JuguetesComponent },
  { path: 'higiene', component: HigieneComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '**', redirectTo: '/catalogo' }
];
