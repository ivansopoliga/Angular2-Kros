import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Office} from '../../../../models/office.admin.model';
import {Equipment} from '../../../../models/equipment.model';
import {OfficeService} from '../../../../services/office.service';
import {EquipmentComponent} from './equipment/equipment.component';
import {Response} from "@angular/http";

@Component({
  selector: "office",
  templateUrl: 'app/components/admin/offices/detail/detail.office.admin.component.html',
  styleUrls: ['lib/css/modalWindow.css'],
  directives: [EquipmentComponent]
})

export class DetailOfficeAdminComponent implements OnInit{
  public error:string;
  public success:string;
  public equipment:Equipment;

  constructor(private officeService:OfficeService) { }

  @Input() officeData:Office;
  @Output() windowClose = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  ngOnInit() {
    if(this.officeData.id)
      this.getEquipmentData();
    else this.equipment = JSON.parse('[]');
  }

  getEquipmentData(){
    this.officeService.getOffice(this.officeData.id).subscribe(
      data => {this.equipment = data.json().equipment},
      error => console.error(error)
    );
  }

  newOffice(){
    let name = this.officeData.name;
    let type = this.officeData.type;
    let description = this.officeData.description;
    let equipment = this.equipment;
    this.officeService.addOffice(JSON.stringify({name, type, description, equipment})).subscribe(
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
    let equipment = this.equipment;
    this.officeService.editOffice(id, JSON.stringify({id, name, type, description, equipment})).subscribe(
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
