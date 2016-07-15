import {Component} from  '@angular/core'

@Component({
    selector: 'admin',
    templateUrl: 'app/components/admin/admin.component.html',
    styleUrls: ['app/components/admin/AdminLTE.css',
                'app/components/admin/AdminLTE.min.css',
                'app/components/admin/skins/skin-blue.css',
                'app/components/admin/skins/skin-blue.min.css' ]
})

export class AdminComponent {
    private admin: boolean = true;
}
