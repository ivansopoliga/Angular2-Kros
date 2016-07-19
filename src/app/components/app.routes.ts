﻿import {provideRouter, RouterConfig}  from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {authProviders}      from './login.routes';
import {AuthGuard} from "./AuthGuard";
import {AdminGuard} from "./AdminGuard";

import {UsersAdminComponent} from './admin/users/users.admin.component'
import {DetailUser} from "./admin/users/detail/detail.user";


const routes:RouterConfig = [
  {path: '', redirectTo: 'home', terminal: true},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: UsersAdminComponent
      },
      /*{
       path: 'offices',
       component: OfficesAdminComponent
       },
       {
       path: 'cars',
       component: CarsAdminComponent
       },*/
      {
        path: 'users',
        component: UsersAdminComponent
      },
      {
        path: 'detail-user/:id',
        component: DetailUser

      },
      {
        path: 'detail-user',
        component: DetailUser

      }
    ]

  }
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes), authProviders
];
