﻿import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from '@angular/common';


@Component({
    selector: 'admin',
  templateUrl: 'app/components/admin/admin.component.html',
  styleUrls: ['app/components/admin/css/AdminLTE.css',
    'app/components/admin/css/AdminLTE.min.css',
    'app/components/admin/css/skins/skin-blue.css',
    'app/components/admin/css/skins/skin-blue.min.css' ]
})

export class AdminComponent {

    private admin: boolean = true;
}
