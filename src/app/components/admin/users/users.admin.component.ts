import {Component, OnInit} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {DetailUserComponent} from './detail/detail.user';
import {User} from './detail/user';
import {Response} from "@angular/http";

@Component({
  templateUrl: 'app/components/admin/users/users.admin.component.html',
  styleUrls: ['app/components/admin/users/users.admin.component.css'],
  directives: [DetailUserComponent, ROUTER_DIRECTIVES]
})

export class UsersAdminComponent implements OnInit {
  public users:Array<User>;
  public userData:User;
  private showOfficeWindow:boolean  = false;

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

  newUser(){
    this.userData = new User();
    this.windowOpen();
  }

  editUser(id:number){
    for(var i = 0; i < this.users.length; i++){
      if(this.users[i].id == id){
        this.userData = this.users[i];
        break;
      }
    }
    this.windowOpen();
  }

  removeUser(id:string) {
    if(confirm("Naozaj chcete vymazať používateľa?")) {
      this.userService.removeUser(id).subscribe(
        data => {
        },
        error => {
          alert(error)
        },
        () => {
          alert('Uspesne odstraneny pouzivatel');
          this.router.navigate(['/admin/users']);
        }
      )
    }
  }

  //opens edit.office.admin.component window
  windowOpen(){
    this.showOfficeWindow = true;
  }

  //closes edit.office.admin.component window
  windowClose(action: boolean){
    this.showOfficeWindow = action;
  }


}
