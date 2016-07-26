import { Component, Input,OnInit,ElementRef} from '@angular/core';
import * as moment from 'moment';
import {User} from '../../../../models/user.admin.model';
import {UserService} from '../../../../services/user.service';
import {OfficeService} from '../../../../services/office.service';
import {CarService} from '../../../../services/car.service';

declare var jQuery:any;

@Component({
  selector: 'reservation-table',
  templateUrl: 'app/components/home/reservations/table/table.reservations.component.html',
  styles: ['.glyphicon { margin-top: 10px; font-size: 16px; margin-bottom: 7px; cursor: pointer;} th {text-align: center;} .occupied {background-color: #0088a8; border-bottom: none; color: white;} .long{border-top: 1px #0088a8 solid;} small{font-size: 75%} p{margin-bottom: 0}']
})

export class TableReservationComponent implements OnInit{
  @Input() data;
  @Input() reservationType;

  public week:number = 0;
  public days;
  public times = JSON.parse('[]');
  public tableData = new Array();
  public reservationsData;
  public usersList:Array<User>;



  constructor(private userService:UserService, private officeService:OfficeService, private carService:CarService) { }

  ngOnInit() {
    moment.locale('sk');
    this.updateTime();
    this.userService.getUsers().subscribe(
      data => {this.usersList = data.json()},
      error => console.log(error),
      () => { this.updateWeek() }
    );
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
    if(this.reservationType=="offices")
      this.updateDataOffices();
    else this.updateDataCars();
  }

  updateTime(){
    for(var i = 7; i < 18; i++) {
      for(var j = 0; j < 2; j++){
        var time = moment().hour(i).minute(j*30).format('HH:mm');
        this.times.push({'time': time});
      }
    }
  }

  updateDataOffices(){
    this.officeService.getOfficeReservations(this.data.id, moment().add(this.week, 'weeks').weekday(1).format("DD.MM.YYYY"), moment().add(this.week, 'weeks').weekday(5).format("DD.MM.YYYY")).subscribe(
      data => { this.reservationsData = data.json() },
      error => console.log(error),
      () => { this.updateData() }
    );
  }

  updateDataCars(){
    this.carService.getCarReservations(this.data.id, moment().add(this.week, 'weeks').weekday(1).format("DD.MM.YYYY"), moment().add(this.week, 'weeks').weekday(5).format("DD.MM.YYYY")).subscribe(
      data => { this.reservationsData = data.json() },
      error => console.log(error),
      () => { this.updateData() }
    );
  }

  updateData(){
    //setting default data to 0
    for(var i = 0; i < this.times.length; i++){
      this.tableData[this.times[i].time] = new Array();
      for(var j = 0; j < 5; j++)
        this.tableData[this.times[i].time][j] = 0;
    }

    //for each record, changes the setting
    for(var i = 0; i < this.reservationsData.length; i++){
      var record = this.reservationsData[i], user:User;
      var time = moment(record.dateTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm"), endTime = moment(record.dateTime, "YYYY-MM-DD HH:mm:ss").add(record.length, 'minutes').format('HH:mm'), day = moment(record.dateTime, "YYYY-MM-DD HH:mm:ss").weekday() - 1;

      for (var j = 0; j < this.usersList.length; j++) { //finding the user whose reservation it is
        if (this.usersList[j].id == record.userId)
          user = this.usersList[j];
      }

      while (time < endTime) {
        if (time == moment(record.dateTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm"))
          this.tableData[time][day] = JSON.parse('{"userName": "' + user.name + ' ' + user.surname + '", "long": 0}');
        else this.tableData[time][day] = JSON.parse('{"userName": "", "long": 1}');
        time = moment(time, 'HH:mm').add(30, 'minutes').format('HH:mm');
      }
    }
  }
}
