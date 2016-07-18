import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, ROUTER_DIRECTIVES, CanActivate} from '@angular/router';
import {Cookie} from '../../services/ng2-cookies/ng2-cookies';
import {Person} from "./person";
import {Response} from "@angular/http";

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.component.html',
  styleUrls: ['app/components/home/home.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent implements OnInit{
  response:any;
  users: any;
  public foods;

  result:Array<Object>;

  constructor(public authService:UserService, public router:Router) {
    this.GetUsers;
  }
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  ngOnInit(){
    this.GetUsers();
  }





  GetUsers() {
    this.authService.getUsers()
      .map((res:Response) => res.json())
      .subscribe(
        data => {this.foods = data},
        error => console.error(error)
      );}

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

}
