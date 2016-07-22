import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Role} from '../../../../models/role.admin.model';
import {RolesService} from '../../../../services/roles.service';

@Component({
  selector: "equipment",
  templateUrl: 'app/components/admin/equipment/detail/detail.role.admin.component.html',
  styleUrls: ['lib/css/modalWindow.css'],
})

export class DetailRoleAdminComponent implements OnInit {
  public error;
  public success;
  public formReset:boolean = true;
  public roleData:Role = new Role();

  @Input() roleId:number;
  @Output() windowClose = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  constructor(private equipmentService:EquipmentService) { }

  ngOnInit(){
    if(this.roleId)
      this.getRole();
  }

  getRole(){
    this.equipmentService.getEquipment(this.roleId).subscribe(
      data => {this.roleData = data.json()},
      error => console.log(error)
    );
  }

  newEquipment(){
    let name = this.roleData.name;
    let id = this.roleData.id;
    this.equipmentService.addEquipment(JSON.stringify({name , id})).subscribe(
      data => { },
      error => { this.error = error; },
      () => {
        this.success = 'Rola úspešné pridaná.';
        this.roleData = new Role();
        this.formReset = false;
        setTimeout(() => this.formReset = true, 0);
        this.updateList.emit(true);
      }
    );
  }

  editEquipment(){
    let name = this.roleData.name;
    let id = this.roleData.id;
    this.equipmentService.editEquipment(id, JSON.stringify({id, name})).subscribe(
      data => { },
      error => { this.error = error; },
      () => {
        this.success = 'Rola úspešne upravená.';
        this.updateList.emit(true);
      }
    );
  }

  closeWindow(){
    this.windowClose.emit(false);
  }
}

