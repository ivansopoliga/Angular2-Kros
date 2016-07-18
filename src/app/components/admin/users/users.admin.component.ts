import {Component, OnInit} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Response} from "@angular/http";

@Component({
  selector: 'users-admin',
  templateUrl: 'app/components/admin/users/users.admin.component.html',
  styleUrls: ['app/components/admin/users/users.admin.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class UsersAdminComponent implements OnInit{
  public users;
  constructor(private router:Router, private userService:UserService){
    this.GetUsers;
  }

  ngOnInit(){
    this.GetUsers();
  }

  GetUsers() {
    this.userService.getUsers()
      .map((res:Response) => res.json())
      .subscribe(
        data => {this.users = data},
        error => console.error(error)
      );}

}
