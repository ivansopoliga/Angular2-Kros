import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {isLoggedin}  from '../../services/isloggedin';
import {Router, CanActivate} from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'app/components/home/home.component.html',
    styleUrls: ['app/components/home/home.component.css']
})



export class HomeComponent {
  constructor(public auth: UserService, public router: Router) {}

  onLogout() {
    
  }
}
