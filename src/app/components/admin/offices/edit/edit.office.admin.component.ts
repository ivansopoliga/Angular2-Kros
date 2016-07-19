import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Office} from './office';

@Component({
  selector: "office",
  templateUrl: 'app/components/admin/offices/edit/edit.office.admin.component.html',
  styleUrls: ['lib/css/modalWindow.css']
})

export class EditOfficeAdminComponent {
  @Input() officeData:Office;
  @Output() windowClose = new EventEmitter<boolean>();

  closeWindow(){
    this.windowClose.emit(false);
  }
}
