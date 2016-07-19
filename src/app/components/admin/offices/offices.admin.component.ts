import {Component, OnInit} from  '@angular/core';
import {OfficeService} from '../../../services/office.service';
import {Response} from "@angular/http";
import {EditOfficeAdminComponent} from './edit/edit.office.admin.component'

@Component({
  templateUrl: 'app/components/admin/offices/offices.admin.component.html',
  styleUrls: ['app/components/admin/offices/offices.admin.component.css'],
  directives: [EditOfficeAdminComponent]
})

export class OfficesAdminComponent implements OnInit{
  public offices;
  private showNewOfficeWindow:boolean = true;

  constructor(private officeService:OfficeService){
    this.GetOffices();
  }

  ngOnInit(){
    this.GetOffices();
  }

  GetOffices() {
    this.officeService.getOffices()
      .map((res:Response) => res.json())
      .subscribe(
        data => {this.offices = data},
        error => console.error(error)
      );
  }

  //opens edit.office.admin.component window
  windowOpen(){
    this.showNewOfficeWindow = true;
  }

  //closes edit.office.admin.component window
  windowClose(action: boolean){
    this.showNewOfficeWindow = action;
  }

}
