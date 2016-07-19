import {Component, OnInit} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Response} from "@angular/http";

@Component({
  templateUrl: 'app/components/admin/users/users.admin.component.html',
  styleUrls: ['app/components/admin/users/users.admin.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class UsersAdminComponent implements OnInit {
  public users;

  constructor(private router:Router, private userService:UserService) {
    this.GetUsers;
  }

  ngOnInit() {
    this.GetUsers();
  }

  GetUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data.json()
        },
        error => console.error(error)
      );
  }

  removeUser(user:any) {
   this.userService.removeUser(user.id).subscribe(
     data =>{   },
    error =>{
      alert(error)
    },
     () => {
       alert('Uspesne odstraneny pouzivatel');
       this.router.navigate(['/admin/users']);
     }
   )
  }


}
