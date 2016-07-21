import {provideRouter, RouterConfig}  from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {authProviders }      from './login.routes';
import {AuthGuard} from "./AuthGuard";
import {AdminGuard} from "./AdminGuard";

import {UsersAdminComponent} from './admin/users/users.admin.component';
import {OfficesAdminComponent} from './admin/offices/offices.admin.component';
import {CarsAdminComponent} from "./admin/cars/cars.admin.component";
import {EquipmentAdminComponent} from "./admin/equipment/equipment.admin.component";


const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: UsersAdminComponent
      },
      {
        path: 'offices',
        component: OfficesAdminComponent
      },
      {
        path: 'cars',
        component: CarsAdminComponent
      },
      {
        path: 'users',
        component: UsersAdminComponent
      },
      {
        path: 'equipment',
        component: EquipmentAdminComponent
      }
    ]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes), authProviders
];
