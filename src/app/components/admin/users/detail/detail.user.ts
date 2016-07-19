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

  constructor(private route: ActivatedRoute,private router: Router, private userService:UserService){
  this.user = new User();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      if(Number.isNaN(id)){
        this.createUser=true;
      } else {
        this.loadUser(id);
        this.createUser=false;
      }
    });
  }


  loadUser(id:number){
    let res:any;
    this.userService.getUser(id).subscribe(
      data => {
        res = data.json();
        console.log(res);
        let jRes=JSON.parse(res);
/*

        this.user.email=user.email;
        this.user.name=user.name;
        this.user.surname=user.surname;
        this.user.username=user.username;*/
      },
      error => console.error(error)
    );
  }




  editUser(id:number){
    alert(id);
  }


  newUser(){
    alert(this.user.email);
  }




}
