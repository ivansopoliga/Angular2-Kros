import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, CanActivate} from '@angular/router';
import { Cookie } from '../../services/ng2-cookies/ng2-cookies';

@Component({
    selector: 'home',
    templateUrl: 'app/components/home/home.component.html',
    styleUrls: ['app/components/home/home.component.css']
})



export class HomeComponent {

  constructor(public authService: UserService, public router: Router) {}



}
