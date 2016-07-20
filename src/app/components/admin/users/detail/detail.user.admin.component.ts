/**
 * Created by Tibor Poštek on 18.07.2016.
 */
import {Component, OnInit,Input, Output, EventEmitter} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {User} from "../../../../models/user.admin.model";

@Component({
  selector: 'user',
  templateUrl: 'app/components/admin/users/detail/detail.user.admin.component.html',
  styleUrls: ['lib/css/modalWindow.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class DetailUserAdminComponent{
  public error;
  public success;

  constructor(private route: ActivatedRoute,private router: Router, private userService:UserService){ }

  @Input() userData:User;
  @Output() windowClose = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  newUser(){
    let email = this.userData.email;
    let name = this.userData.name;
    let surname = this.userData.surname;
    let passwordHash = "$2a$06$gF/DQUqo0z8xD3kzEketk.XGRt8PZP3fvbEUVbOcmWxeVI8jaH0OG";
    let isLocked = false;
    let dateCreated = new Date().toLocaleString("sk-SK");
    let photo = "0x89504E470D0A1A0A0000000D4948445200000040000000400806000000AA6971DE0000000473424954080808087C086488000000097048597300000B1300000B1301009A9C180000071649444154789CED9B6B6C154514C77F45FAA6229487A6B42A3E4A23A2203E82A8C1F8368054A3D12F7E2031860F28C1C418345111A43E";
    let Roles= '1';
    this.userService.addUser(JSON.stringify({email, name, surname, passwordHash, isLocked, dateCreated, photo})).subscribe(
      data => {
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Užívateľ úspešne vytvorený.';
        this.userData = new User();
        this.updateList.emit(true);
      }
    );

  }

  editUser(){
    let id = this.userData.id;
    let email = this.userData.email;
    let name = this.userData.name;
    let surname = this.userData.surname;
    let photo = "0x89504E470D0A1A0A0000000D4948445200000040000000400806000000AA6971DE0000000473424954080808087C086488000000097048597300000B1300000B1301009A9C180000071649444154789CED9B6B6C154514C77F45FAA6229487A6B42A3E4A23A2203E82A8C1F8368054A3D12F7E2031860F28C1C418345111A43E";
    let Roles= '1';
    this.userService.editUser(this.userData.id, JSON.stringify({id, email, name, surname, photo})).subscribe(
      data => {
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Užívateľ úspešne upravený.';
        this.updateList.emit(true);
      }
    );

  }

  closeWindow(){
    this.windowClose.emit(false);
  }
}
