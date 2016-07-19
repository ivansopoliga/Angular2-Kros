import {Component, Output, EventEmitter} from '@angular/core'

@Component({
  selector: "new-office",
  templateUrl: 'app/components/admin/offices/edit/edit.office.admin.component.html',
  styleUrls: ['app/components/admin/offices/edit/edit.office.admin.component.css']
})

export class EditOfficeAdminComponent {
  @Output() windowClose = new EventEmitter<boolean>();

  closeWindow(){
    this.windowClose.emit(false);
  }
}
