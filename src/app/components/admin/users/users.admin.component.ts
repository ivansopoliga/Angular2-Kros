import {Component, OnInit} from  '@angular/core';
import {UserService} from '../../../services/user.service';
import {Response} from "@angular/http";

@Component({
  templateUrl: 'app/components/admin/users/users.admin.component.html',
  styleUrls: ['app/components/admin/users/users.admin.component.css'],
})

export class UsersAdminComponent implements OnInit{
  public users;
  constructor(private userService:UserService){
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
