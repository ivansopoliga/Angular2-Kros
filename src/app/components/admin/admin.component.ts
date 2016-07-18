import {Component, OnInit} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Response} from "@angular/http";

@Component({
    selector: 'admin',
    templateUrl: 'app/components/admin/admin.component.html',
    styleUrls: ['app/components/admin/admin.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class AdminComponent{

}
