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
  public sizes:Array<string> = new Array();

  constructor() {
    this.sizes['width'] = (document.documentElement.clientWidth + document.getElementById("leftMenu").clientWidth + 1).toString()+'px';
    this.sizes['height'] = (document.getElementById("contentWindow").clientHeight + 78 + 78).toString()+'px';
    this.sizes['modalHeight'] = (7*window.innerHeight / 8).toString()+'px';
    this.sizes['leftMenu'] = (- document.getElementById("leftMenu").clientWidth - 1).toString()+'px';
    this.sizes['top'] = ((window.innerHeight - 7*window.innerHeight / 8) /2).toString()+'px';
  }

  closeWindow(){
    this.windowClose.emit(false);
  }
}
