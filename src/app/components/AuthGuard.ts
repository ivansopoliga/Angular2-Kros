/**
 * Created by Tibor Poštek on 14.07.2016.
 */
import {UserService} from '../services/user.service';
import {Router, CanActivate} from '@angular/router';
import { Cookie } from '../services/ng2-cookies/ng2-cookies';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: UserService, public router: Router){}
  canActivate() {
    console.log(Cookie.get('KrosbookAuthentification'));

    let myCookie = Cookie.get('cookieName');
    myCookie

    if (Cookie.get('KrosbookAuthentification')!=''){
      return true; }
    this.router.navigate(['/login']);
    return false;

    //console.log(Cookie.get('KrosbookAuthentification'));
    //this.router.navigate(['/login']);
    //return false;

  }
}
