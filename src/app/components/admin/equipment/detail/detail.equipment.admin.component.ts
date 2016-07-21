/**
 * Created by krosaci on 21.7.2016.
 */
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Equipment} from '../../../../models/equipment.admin.model';
import {EquipmentService} from '../../../../services/equipment.service';
import {Response} from "@angular/http";

@Component({
  selector: "equipment",
  templateUrl: 'app/components/admin/equipment/detail/detail.equipment.admin.component.html',
  styleUrls: ['lib/css/modalWindow.css'],
})

export class DetailEquipmentAdminComponent implements OnInit {
  public error;
  public success;
  public equipmentData:Equipment = new Equipment();

  @Input() equipmentId:number;
  @Output() windowClose = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  constructor(private equipmentService:EquipmentService) { }

  ngOnInit(){
    if(this.equipmentId)
      this.getEquipment();
  }

  getEquipment(){
    this.equipmentService.getEquipment(this.equipmentId).subscribe(
      data => {this.equipmentData = data.json()},
      error => console.log(error)
    );
  }

  newEquipment(){
    let description = this.equipmentData.description;
    let amount = this.equipmentData.amount;
    this.equipmentService.addEquipment(JSON.stringify({description , amount})).subscribe(
      data => {
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Vybavenie úspešne pridané.';
        this.equipmentData = new Equipment();
        this.updateList.emit(true);
        //this.closeWindow();
      }
    );
  }

  editEquipment(){
    let id = this.equipmentData.id;
    let description= this.equipmentData.description;
    let amount = this.equipmentData.amount;
    this.equipmentService.editEquipment(id, JSON.stringify({id, description, amount})).subscribe(
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

