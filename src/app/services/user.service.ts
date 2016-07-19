import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import { Cookie } from './ng2-cookies/ng2-cookies';
import {Observable} from "rxjs/Rx";


@Injectable()
export class UserService {
    hasRoleAdmin: boolean = false;

    constructor(private http: Http) {
    }

    public login(Email: string, Password: string) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
       return this.http.post('http://localhost:50909/api/authentification/login', JSON.stringify({
            Email, Password
        }), { headers  } );
    }



    public logout() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      Cookie.delete('KrosbookAuthentification');
      return this.http.get('http://localhost:50909/api/authentification/logout', { headers  } );
    }


    public  isLoggedIn(){
      if(Cookie.get('KrosbookAuthentification')!=null){
        return true;
      }
      else {
        return false;}
    }

  public getUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/users', { headers  } );
  }

  public getUser(id:number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/users/'+id, { headers  } );
  }


  public removeUser(id: string) {
    return this.http.delete('http://localhost:50909/api/users/'+id);
  }

}
