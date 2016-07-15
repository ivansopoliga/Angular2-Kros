import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from '@angular/common';
import {TableData} from './table.data';


@Component({
    selector: 'admin',
<<<<<<< HEAD
  templateUrl: 'app/components/admin/admin.component.html',
  styleUrls: ['app/components/admin/admin.component.css']

})

export class AdminComponent {

=======
    templateUrl: 'app/components/admin/admin.component.html',
    styleUrls: ['app/components/admin/AdminLTE.css',
                'app/components/admin/AdminLTE.min.css',
                'app/components/admin/skins/skin-blue.css',
                'app/components/admin/skins/skin-blue.min.css' ]
})

export class AdminComponent {
    private admin: boolean = true;
>>>>>>> origin/master
}
