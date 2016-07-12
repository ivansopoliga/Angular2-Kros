import {Injectable} from '@angular/core';
import {Http, Headers, Response, Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'




@Injectable()
export class UserService {
    private token: string;


    constructor(private http: Http) {
        this.token = localStorage.getItem('token');
    }

    public login(Email: string, Password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
      //  alert('Prihlasujem sa...');

       return this.http.post('http://localhost:50909/api/authentification/login', JSON.stringify({
            Email, Password
        }), { headers });






         /*   .map(res => res.json())
            .subscribe(
            data => data.header ,
            err => console.log(err),
            () => console.log('Authentication Complete')
            );*/
            /*
            .map(res => res.json())
            .map((res) => {
               // if (res.success) {
                    localStorage.setItem('auth_token', res.auth_token);
                    this.token = true;
                //}
                return res.success;
            });*/

    }


    logout() {
        alert('Odhlasujem sa...');
        return this.http.get('api/authentication/logout', {
          headers: new Headers({
            'x-security-token': this.token
          })
        })
        .map((res : any) => {
          this.token = undefined;
          localStorage.removeItem('token');
        });

    }

    public isLoggedin() {
        return this.token;
}


}
