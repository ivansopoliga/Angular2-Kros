/**
 * Created by Tibor Poštek on 15.07.2016.
 */
import {UserService} from '../services/user.service';
import {Router, CanActivate} from '@angular/router';
import {Injectable} from "@angular/core";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public authService:UserService, public router:Router) {
  }

  pom:boolean = null;
  response:any

  canActivate() {
 /*   this.authService.getUsers().subscribe(response => {
        this.response = response;
        this.pom = true;
      },
      error => {
        this.pom = false;
        this.response = error;
      }
    );
    console.log(this.response.text());
   // while (this.pom==null){
   //   console.log('cakam');
   // }
    return this.pom;
*/
 return true;
  }
}
