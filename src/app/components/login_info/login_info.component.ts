import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import 'rxjs/add/operator/map';
import { Cookie } from '../../services/ng2-cookies/ng2-cookies';

@Component({
  selector: 'user_info',
  templateUrl: 'app/components/login_info/login_info.component.html',
  styleUrls: ['app/components/login_info/login_info.component.css']

})
export class LoginInfoComponent {
  private email: string;
  private password: string;
  private error: string;
  private year = '2016';
  response:any;

}
