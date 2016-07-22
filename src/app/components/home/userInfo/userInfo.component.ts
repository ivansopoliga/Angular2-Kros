import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'user_info',
  templateUrl: 'app/components/home/userInfo/userInfo.component.html',
  styleUrls: ['app/components/home/userInfo/userInfo.component.css']

})
export class UserInfoComponent {

}
