/**
 * Created by Tibor Poštek on 18.07.2016.
 */
import {Component, OnInit,Input, Output, EventEmitter} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {User} from "./user";

@Component({
  selector: 'user',
  templateUrl: 'app/components/admin/users/detail/detail.user.html',
  styleUrls: ['lib/css/modalWindow.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class DetailUserComponent{
  @Input() userData;
  @Output() windowClose = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute,private router: Router, private userService:UserService){
  }


  closeWindow(){
    this.windowClose.emit(false);
  }



  editUser(id:number){
    alert(id);
  }


  newUser(){
  let email = this.userData.email;
  let name = this.userData.name;
  let surname = this.userData.surname;
  let password = this.userData.password;
  let username = this.userData.username;
  let photo = this.userData.photo;
    let Roles= '1';
    this.userService.addUser(JSON.stringify({email, name, username, surname, password, photo, Roles})).subscribe(
      data => {
      },
      error => {
        alert(error)
      },
      () => {
        alert('Uspesne pridany pouzivatel');
        this.closeWindow();
      }
    );

  }




}
