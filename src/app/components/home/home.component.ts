import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, ROUTER_DIRECTIVES, CanActivate} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {UserInfoComponent} from './userInfo/userInfo.component';

import {Response} from "@angular/http";

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.component.html',
  styleUrls: ['app/components/home/home.component.css'],
  directives: [ROUTER_DIRECTIVES, UserInfoComponent]
})

export class HomeComponent implements OnInit{
  public isViewed:boolean = false;
  response:any;
  users: any;
  public foods;

  result:Array<Object>;

  constructor(public authService:UserService, public router:Router) {

  }
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  ngOnInit(){

  }



  GetUsersStare() {
  this.authService.getUsers().subscribe(response => {
      this.response = response;
      if(this.response._body==null){
        alert('Nie ste administrator');
      } else {
        alert('Ste administrator');
      }
    },
    error => {
      alert('Nastala chyba');
      this.response=error;
      console.log(error.text());
    }
  );
  }

  show()
  {
    var str = (<HTMLTextAreaElement>document.getElementById("contentWindow"));
   // alert(str.toString()+"" + this.isViewed);
    this.isViewed=!this.isViewed;

  }


  }
