/**
 * Created by krosaci on 21.7.2016.
 */
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Office} from '../../../../models/office.admin.model';
import {Equipment} from '../../../../models/equipment.admin.model';
import {EquipmentService} from '../../../../services/equipment.service';
//import {EquipmentComponent} from './equipment.component';
import {Response} from "@angular/http";


import {stringify} from "@angular/common/esm/src/facade/lang";

@Component({
  selector: "equipment",
  templateUrl: 'app/components/admin/equipment/detail/detail.equipment.admin.component.html',
  styleUrls: ['lib/css/modalWindow.css'],
  //directives: [EquipmentComponent]
})

export class DetailEquipmentAdminComponent {
  public error;
  public success;

  constructor(private equipmentService:EquipmentService) { }

  @Input() equipmentData:Equipment;
  @Output() windowClose = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  newEquipment(){
    let description = this.equipmentData.description;  /*data su nacitane z ineho componentu*/
    let amount = this.equipmentData.amount;
    this.equipmentService.addEquipment(JSON.stringify({description , amount})).subscribe( /* volanie metody addCar s param*/
      data => {        /*vyhodnotenie podla return hodnoty requestu*/
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Miestnosť úspešne vytvorená.';
        this.equipmentData = new Equipment();
        this.updateList.emit(true);
        //this.closeWindow();
      }
    );
  }

  editEquipment(){
    let id=this.equipmentData.id;
    let description= this.equipmentData.description;
    let amount = this.equipmentData.amount;
    // pouzitie STRINGIFY
    this.equipmentService.editEquipment(stringify(id), JSON.stringify({id, description, amount})).subscribe(
      data => {
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Vybavenie úspešne upravené.';
        this.updateList.emit(true);
        //this.closeWindow();
      }
    );
  }

  closeWindow(){
    this.windowClose.emit(false);
  }
}

