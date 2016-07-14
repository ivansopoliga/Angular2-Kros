import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import 'rxjs/add/operator/map'
import { Cookie } from '../../services/ng2-cookies/ng2-cookies';

@Component({
    selector: 'login',
    templateUrl: 'app/components/login/login.component.html',
    styleUrls: ['app/components/login/login.component.css']

})
export class LoginComponent {
  private email: string;
  private password: string;
  private error: string;
  private year = '2016';
  response:any;

  constructor(private router: Router, private userService: UserService) {
  }


  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(
      response => {
        this.response = response;
        console.log(response);
        localStorage.setItem('login', 'ok');

      //  this.router.navigate(['/home']);
      },
      error => {
        this.error = 'Nesprávny email/heslo';
        this.response=error;
        console.log(error.text());
      }
    );


  }

  showCookie(){
   // document.cookie = 'Ahoj';
    alert(document.cookie.toString());
    console.log('Moja cookie: '+ JSON.stringify(Cookie.getAll()));
  }

}
