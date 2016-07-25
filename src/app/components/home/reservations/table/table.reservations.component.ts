import { Component, Input,OnInit } from '@angular/core';
import {RowTableReservationsComponent} from './row/row.table.reservations.component';
import * as moment from 'moment';

@Component({
  selector: 'reservation-table',
  templateUrl: 'app/components/home/reservations/table/table.reservations.component.html',
  styles: ['.glyphicon { margin-top: 10px; font-size: 16px; margin-bottom: 7px; cursor: pointer;} th {text-align: center;}'],
  directives: [RowTableReservationsComponent]
})

export class TableReservationComponent implements OnInit{
  public week:number = 0;
  public rows = JSON.parse('[]');
  public days;

  @Input() data;

  ngOnInit() {
    moment.locale('sk');
    this.updateWeek();
    for(var i = 7; i < 18; i++){
      for(var j = 0; j < 2; j++)
      {
        var time = moment().hour(i).minute(j*30).format('HH:mm');
        this.rows.push({'time': time, 'reservation': 'voľné'});
      }
    }
  }

  moveFor(){
    this.week += 1;
    this.updateWeek();
  }

  moveBack(){
    this.week -= 1;
    this.updateWeek();
  }

  updateWeek(){
    this.days = JSON.parse('[]');
    for(var i = 1; i < 6; i++) {
      var day = moment().add(this.week, 'weeks').weekday(i).format("dd DD.MM.YY");
      this.days.push(day);
    }
  }

  reserve(target){
    target.style.backgroundColor = (target.style.backgroundColor == "red") ? "transparent" : "red";
    //target.html = (target.html == "voľné") ? "rezervované" : "voľné";
  }
}
