/**
 * Created by Tibor Poštek on 15.07.2016.
 */
import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from '@angular/common';


@Component({
  selector: 'users',
  templateUrl: 'app/components/admin/users.component.html',
  styleUrls: ['app/components/admin/css/AdminLTE.css',
    'app/components/admin/css/AdminLTE.min.css',
    'app/components/admin/css/skins/skin-blue.css',
    'app/components/admin/css/skins/skin-blue.min.css' ]
})

export class UsersComponent {

  private admin: boolean = true;
}
