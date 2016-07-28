/**
 * Created by krosaci on 26.7.2016.
 */
import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES, CanActivate} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from "../../../../models/user.admin.model";


import {Http} from '@angular/http';
import {PasswordValidator} from "../../../../validators/password.validator";


@Component({
  selector: 'password',
  templateUrl: 'app/components/home/profile/password/password.component.html',
  styleUrls: ['app/components/home/profile/password/password.component.css'],
  directives: [ROUTER_DIRECTIVES,PasswordValidator]

})

export class PasswordComponent implements OnInit{
  public userData:User;

  public p = JSON.parse('[{"id":2002,"email":"ondrejpudis@gmail.com","name":"Ondrej","surname":"Pudiš","roles":[{"roleId":1}]}]');
  public heslo = JSON.parse('[{"stare":"stardddddddddddddde","nove":"nove","nove2":"nove2"}]');
  public passwordData:any;


  constructor(private http: Http) {}



  ngOnInit(){

  }



  registerPass(password) {

    let data = JSON.stringify(password);
    this.passwordData = JSON.parse(data);


    alert("HESLO"+data+this.passwordData.new2_password);

  }

  editPassword() {

  }


}


