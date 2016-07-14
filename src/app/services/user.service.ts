import {Injectable} from '@angular/core';
import {Http, Headers, Response, Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Cookie } from './ng2-cookies/ng2-cookies';





@Injectable()
export class UserService {
    private token: string;


    constructor(private http: Http) {
    }

    public login(Email: string, Password: string) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
       return this.http.post('http://localhost:50909/api/authentification/login', JSON.stringify({
            Email, Password
        }), { headers  } );   }

    public logout() {
      Cookie.delete('KrosbookAuthentification');
    }


    public  isLoggedIn(){
      if(Cookie.get('KrosbookAuthentification')!=null){
        return true;
      }
      else {
        return false;}
    }


}
