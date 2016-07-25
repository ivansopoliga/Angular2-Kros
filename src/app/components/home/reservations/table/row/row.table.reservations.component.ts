/**
 * Created by Ondrej on 25.07.2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'table-row',
  templateUrl: 'app/components/home/reservations/table/row/row.table.reservations.component.html'
})

export class RowTableReservationsComponent implements OnInit{
  public rows = JSON.parse('[]');

  ngOnInit() {
    for(var i = 7; i < 18; i++){
      for(var j = 0; j < 2; j++)
      {
        var time = moment().hour(i).minute(j*30).format('HH:mm');
        this.rows.push({'time': time, 'reservation': 'voľné'});
      }
    }
  }
}
