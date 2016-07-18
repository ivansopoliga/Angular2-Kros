import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, CanActivate} from '@angular/router';
import {Cookie} from '../../services/ng2-cookies/ng2-cookies';

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.component.html',
  styleUrls: ['app/components/home/home.component.css']
})

export class HomeComponent {
  response:any;
  dataset: any;
  constructor(public authService:UserService, public router:Router) {
  }



  GetUsers() {
    this.authService.getUsers()
      .subscribe(
        data => {this.dataset = JSON.stringify(data);
                alert(this.dataset);},
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
