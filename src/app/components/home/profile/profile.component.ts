/**
 * Created by krosaci on 25.7.2016.
 */
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router, ROUTER_DIRECTIVES, CanActivate} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserInfoComponent} from '../userInfo/userInfo.component';
import {EmailValidator} from '../../../validators/email.validator';
import {User} from "../../../models/user.admin.model";

import {Response} from "@angular/http";
import {PasswordComponent} from "./password/password.component";

@Component({
  selector: 'profile',
  templateUrl: 'app/components/home/profile/profile.component.html',
  styleUrls: ['app/components/home/profile/profile.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class ProfileComponent implements OnInit{
  public isViewed:boolean = false;
  public userData:User;
  public p = JSON.parse('[{"id":2002,"email":"ondrejpudis@gmail.com","name":"Ondrej","surname":"Pudiš","roles":[{"roleId":1}]}]');


  constructor(public authService:UserService, public router:Router) {
  }

  ngOnInit(){
  }


   show()
   {
     var str = (<HTMLTextAreaElement>document.getElementById("contentWindow"));
     this.isViewed=!this.isViewed;

   }

  editUser() {
    let id = this.userData.id;
    let email = this.userData.email;
    let name = this.userData.name;
    let surname = this.userData.surname;
    let PhotoBase64 = this.userData.photoBase64;


  }


}
