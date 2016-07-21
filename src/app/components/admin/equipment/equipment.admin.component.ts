/**
 * Created by krosaci on 21.7.2016.
 */
import {Component, OnInit} from  '@angular/core';
import {EquipmentService} from '../../../services/equipment.service';
import {Response} from "@angular/http";
import {Equipment} from '../../../models/equipment.admin.model';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {DetailEquipmentAdminComponent} from './detail/detail.equipment.admin.component';

@Component({
  templateUrl: 'app/components/admin/equipment/equipment.admin.component.html',
  directives: [ROUTER_DIRECTIVES, DetailEquipmentAdminComponent]
})

export class EquipmentAdminComponent implements OnInit{
  public equipments:Array<Equipment>;
  public equipmentId:number;
  private showEquipmentWindow:boolean = false;

  constructor(private equipmentService:EquipmentService){ }

  ngOnInit(){
    this.getEquipments();
  }

  getEquipments() {
    this.equipmentService.getEquipments()
      .subscribe(
        data => {this.equipments = data.json()},
        error => console.error(error)
      );
  }

  deleteEquimpment(id:string){
    if(confirm("Naozaj chcete vymazať vybavenie?")) {
      this.equipmentService.removeEquipment(id).subscribe(
        data => {
        },
        error => {
          alert(error)
        },
        () => {
          this.getEquipments();
        }
      )
    }
  }

  newEquimpent() {
    this.equipmentId = null;
    this.windowOpen();
  }

  editEquimpent(id:number){
    for(var i = 0; i < this.equipments.length; i++){
      if(this.equipments[i].id == id){
        this.equipmentId = this.equipments[i].id;
        break;
      }
    }
    this.windowOpen();
  }

  windowOpen(){
    this.showEquipmentWindow = true;
  }

  windowClose(action: boolean){
    this.showEquipmentWindow = action;
  }
}
