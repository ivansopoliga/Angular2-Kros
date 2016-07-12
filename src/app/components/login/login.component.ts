import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
//import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'


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

  constructor(private router: Router, private userService: UserService) {
  }


  onSubmit() {
    /*
     this.userService.login(this.email, this.password).subscribe((error) => {
     if (error) {
     this.router.navigate(['/home']);
     } else {
     this.error = 'Nesprávne email/heslo';
     }
     });
     */


    this.userService.login(this.email, this.password);
    /*
      .subscribe(
        data => {
          alert(JSON.stringify(data));
          this.router.navigate(['/home']);

        }, // Reach here if res.status >= 200 && <= 299
        (err) => this.error = 'Nesprávny email/heslo');

*/
  }

}
