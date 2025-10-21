import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { PerrosComponent } from './pages/mascotas/perros/perros.component';
import { GatosComponent } from './pages/mascotas/gatos/gatos.component';
import { ConejosComponent } from './pages/mascotas/conejos/conejos.component';
import { PecesComponent } from './pages/mascotas/peces/peces.component';
import { IguanasComponent } from './pages/mascotas/iguanas/iguanas.component';
import { AvesComponent } from './pages/mascotas/aves/aves.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { JuguetesComponent } from './pages/juguetes/juguetes.component';
import { HigieneComponent } from './pages/higiene/higiene.component';
import { RoleGuard } from './guards/role.guard';
import { TipoUsuario } from './models/usuario.model';

export const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'mascotas/perros', component: PerrosComponent },
  { path: 'mascotas/gatos', component: GatosComponent },
  { path: 'mascotas/conejos', component: ConejosComponent },
  { path: 'mascotas/peces', component: PecesComponent },
  { path: 'mascotas/iguanas', component: IguanasComponent },
  { path: 'mascotas/aves', component: AvesComponent },
  { path: 'alimentacion', component: AlimentacionComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'juguetes', component: JuguetesComponent },
  { path: 'higiene', component: HigieneComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'carrito',
    component: CarritoComponent,
    canActivate: [RoleGuard],
    data: { roles: [TipoUsuario.ADMIN, TipoUsuario.CLIENTE] }
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: { roles: [TipoUsuario.ADMIN] }
  },
  {
    path: 'admin/productos/nuevo',
    component: ProductoFormComponent,
    canActivate: [RoleGuard],
    data: { roles: [TipoUsuario.ADMIN] }
  },
  {
    path: 'admin/productos/editar/:id',
    component: ProductoFormComponent,
    canActivate: [RoleGuard],
    data: { roles: [TipoUsuario.ADMIN] }
  },
  {
    path: 'producto/:id',
    component: ProductoDetalleComponent
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '/catalogo' }
];
