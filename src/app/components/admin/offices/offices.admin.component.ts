import {Component, OnInit} from  '@angular/core';
import {OfficeService} from '../../../services/office.service';
import {Response} from "@angular/http";
import {EditOfficeAdminComponent} from './edit/edit.office.admin.component';
import {Office} from './edit/office';

@Component({
  templateUrl: 'app/components/admin/offices/offices.admin.component.html',
  styleUrls: ['app/components/admin/offices/offices.admin.component.css'],
  directives: [EditOfficeAdminComponent]
})

export class OfficesAdminComponent implements OnInit{
  public offices:Array<Office>;
  public officeData:Office;
  private showOfficeWindow:boolean = false;

  constructor(private officeService:OfficeService){ }

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

  deleteOffice(id:string){
    if(confirm("Naozaj chcete vymazať miestnosť?")) {
      this.officeService.removeOffice(id).subscribe(
        data => {
        },
        error => {
          alert(error)
        },
        () => {
          this.GetOffices();
        }
      )
    }
  }

  newOffice() {
    this.officeData = new Office();
    this.windowOpen();
  }

  editOffice(id:number){
    for(var i = 0; i < this.offices.length; i++){
        if(this.offices[i].id == id){
          this.officeData = this.offices[i];
          break;
        }
    }
    this.windowOpen();
  }

  //opens edit.office.admin.component window
  windowOpen(){
    this.showOfficeWindow = true;
  }

  //closes edit.office.admin.component window
  windowClose(action: boolean){
    this.showOfficeWindow = action;
  }
}
