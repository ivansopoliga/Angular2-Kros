import {provideRouter, RouterConfig}  from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import { loginRoutes, authProviders }      from './login.routes';
import {AuthGuard} from "./AuthGuard";


const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
 // loginRoutes,
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent }
];



export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes), authProviders
];
