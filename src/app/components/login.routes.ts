/**
 * Created by Tibor Poštek on 14.07.2016.
 */
import { RouterConfig }       from '@angular/router';
import { UserService }        from '../services/user.service';
import { LoginComponent }     from './login/login.component';
import {AuthGuard} from "./AuthGuard";

export const loginRoutes: RouterConfig = [
  { path: 'login', component: LoginComponent }
];
export const authProviders = [AuthGuard, UserService];
