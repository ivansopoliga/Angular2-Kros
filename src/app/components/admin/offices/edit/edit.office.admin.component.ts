import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Office} from './office';
import {OfficeService} from '../../../../services/office.service';
import {Response} from "@angular/http";

@Component({
  selector: "office",
  templateUrl: 'app/components/admin/offices/edit/edit.office.admin.component.html',
  styleUrls: ['lib/css/modalWindow.css']
})

export class EditOfficeAdminComponent {
  public error;
  public success;

  constructor(private officeService:OfficeService) { }

  @Input() officeData:Office;
  @Output() windowClose = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  newOffice(){
    let name = this.officeData.name;
    let type = this.officeData.type;
    let description = this.officeData.description;
    this.officeService.addOffice(JSON.stringify({name, type, description})).subscribe(
      data => {
      },
        error => {
          this.error = error;
        },
        () => {
          this.success = 'Miestnosť úspešne vytvorená.';
          this.officeData = new Office();
          this.updateList.emit(true);
          //this.closeWindow();
        }
    );
  }

  editOffice(){
    let id = this.officeData.id;
    let name = this.officeData.name;
    let type = this.officeData.type;
    let description = this.officeData.description;
    this.officeService.editOffice(id, JSON.stringify({id, name, type, description})).subscribe(
      data => {
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Miestnosť úspešne upravená.';
        this.updateList.emit(true);
        //this.closeWindow();
      }
    );
  }

  closeWindow(){
    this.windowClose.emit(false);
  }
}
