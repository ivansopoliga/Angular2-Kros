/**
 * Created by krosaci on 26.7.2016.
 */
/**
 * Created by krosaci on 26.7.2016.
 */
import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES, CanActivate} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from "../../../../models/user.admin.model";



@Component({
  selector: 'avatar',
  templateUrl: 'app/components/home/profile/avatar/avatar.component.html',
  styleUrls: ['app/components/home/profile/avatar/avatar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class AvatarComponent implements OnInit{
  public userData:User;
  public p = JSON.parse('[{"id":2002,"email":"ondrejpudis@gmail.com","name":"Ondrej","surname":"Pudiš","roles":[{"roleId":1}]}]');



  ngOnInit(){
  }


  editPassword() {

  }


}


