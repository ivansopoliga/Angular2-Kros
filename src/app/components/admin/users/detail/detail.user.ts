/**
 * Created by Tibor Poštek on 18.07.2016.
 */
import {Component, OnInit,Input} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {User} from "./user";

@Component({
  templateUrl: 'app/components/admin/users/detail/detail.user.html',
  styleUrls: ['app/components/admin/users/users.admin.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class DetailUser implements OnInit{
  private sub: any;
  private user:User;
  private error;
  private createUser:boolean;

  constructor(private route: ActivatedRoute,private router: Router){
  this.user = new User();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      if(Number.isNaN(id)){
        this.createUser=true;
      } else {
        this.createUser=false;
      }
    });
  }


  editUser(id:number){
    alert(id);
  }


  newUser(){
    alert(this.user.email);
  }




}
