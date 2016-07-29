/**
 * Created by Ondrej on 25.07.2016.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OfficeService} from '../../../services/office.service';
import {CarService} from '../../../services/car.service';
import {Office} from '../../../models/office.admin.model';
import {TableReservationComponent} from './table/table.reservations.component';
import * as moment from 'moment';

@Component({
  templateUrl: 'app/components/home/reservations/reservations.component.html',
  styleUrls: ['app/components/home/reservations/reservations.component.css'],
  directives: [TableReservationComponent]
})

export class ReservationsComponent implements OnInit{
  public sub;
  public reservationType:string;
  public times = JSON.parse('[]');
  public name:string;
  public data;

  constructor(private route:ActivatedRoute, private officeService:OfficeService, private carService:CarService){ }

  ngOnInit(){
    this.updateTime();
    this.sub = this.route.params.subscribe(params => {
      this.reservationType = params['type'];
      this.name = (params['type'] == 'offices') ? 'miestnosti' : 'autá';
      if(this.reservationType == 'offices')
        this.loadOfficesData();
      else this.loadCarsData();
    });
  }

  loadOfficesData(){
    this.officeService.getOffices().subscribe(
      data => { this.data = data.json() },
      error => console.log(error)
    );
  }

  loadCarsData() {
    this.carService.getCars().subscribe(
      data => { this.data = data.json() },
      error => console.log(error)
    );
  }

  updateTime() {
    for (var i = 7; i < 18; i++) {
      for (var j = 0; j < 2; j++) {
        var time = moment().hour(i).minute(j * 30).format('HH:mm');
        this.times.push({'time': time});
      }
    }
  }
}
