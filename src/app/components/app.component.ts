import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {UserService} from '../services/user.service';
import {OfficeService} from '../services/office.service';

@Component({
    selector: 'app-root',
  template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        UserService, OfficeService
    ]
})
export class AppComponent { }
