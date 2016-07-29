import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {User} from '../../../../models/user.admin.model';
import {UserService} from '../../../../services/user.service';
import {OfficeService} from '../../../../services/office.service';
import {CarService} from '../../../../services/car.service';


declare var $:any;


@Component({
  selector: 'reservation-table',
  templateUrl: 'app/components/home/reservations/table/table.reservations.component.html',
  styles: ['.glyphicon { margin-top: 10px; font-size: 16px; margin-bottom: 7px; cursor: pointer;}']
})

export class TableReservationComponent implements OnInit {
  @Input() data;
  @Input() times;
  @Input() reservationType;

  public week:number = 0;
  public days;
  public tableData = new Array();
  public reservationsData;
  public usersList:Array<User>;

  constructor(private userService:UserService, private officeService:OfficeService, private carService:CarService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        this.usersList = data.json()
      },
      error => console.log(error),
      () => {
        this.updateWeek()
      }
    );
  }

  fillTable() {
    var table = '', fromRow, fromCol, length = 0, isMouseDown = false, thisDocument = this, column = 0;
    for (var i = 0; i < this.times.length; i++) {
      table += '<tr>';
      table += '<td>' + this.times[i].time + '</td>';
      for (let cell of this.tableData[this.times[i].time]) {
        if (cell.long == null) {
          table += '<td class="empty">&nbsp;&nbsp;&nbsp;</td>';
        } else {
          if (cell.reservationName == null) {
            table += '<td  class="bg-primary full" style="border-top: none; border-bottom: none;">&nbsp;&nbsp;&nbsp;</td>';
          } else {
            table += '<td class="bg-primary full text-center" style="border-bottom: none;"><strong>' + cell.reservationName + '</strong> <br> <small>' + cell.userName + '</small></td>';
          }
        }
      }
      table += '</tr>';
    }
    $("#reservationTable"+this.data.id+" .records").html(table);

    $("#reservationTable"+this.data.id+" td.empty").on("mouseenter", function (event) {
      var col = $(this).parent().children().index($(this));
      var row = $(this).parent().parent().children().index($(this).parent());

      if(!isMouseDown)
        column = $(this).index() + 1;

      $('#reservationTable'+thisDocument.data.id+' td.empty:nth-child('+ column +')')
        .on("mousedown", function (event) {
          if(event.which != 1) return false; //does not work for other than left button
          isMouseDown = true;
          $(this).css({"background-color": "#5cb85c", "border": "none"});
          fromRow = row;
          fromCol = col;
          return false; //don't insert taxt in cell
        })
        .on("mouseover", function () {
          if(isMouseDown && ($(this).index() + 1) == column) {
            $(this).css({"background-color": "#5cb85c", "border": "none"});
          }
        })
        .on("mouseup", function () {
          length = row - fromRow + 1;
          column = 0;
        })
    });

    $(document).on("mouseup", function () {
      if(isMouseDown) {
        thisDocument.makeReservation(fromRow, fromCol, length);
        isMouseDown = false;
      }
    });
  }

  makeReservation(fromRow:number, fromCol:number, length:number) {
    var date, hours = 7, minutes = 0;
    if(fromRow % 2 != 0){
      fromRow -= 1;
      minutes = 30;
    }
    for(var i = 0; i < fromRow / 2; i++)
      hours++;
    date = moment().add(this.week, 'weeks').weekday(fromCol).hour(hours).minute(minutes).format("DD.MM.YYYY HH:mm");
    //checks, if selected time is not already reserved
    var time = moment().hour(hours).minute(minutes).format("HH:mm"), endTime = moment(time, 'HH:mm').add(length*30, 'minutes').format("HH:mm");
    while (time < endTime) {
      if(this.tableData[time] && this.tableData[time][fromCol - 1]){
        alert('Vaša rezervácia zasahuje do inej rezervácie. Zvoľte svoju rezerváciu inak.');
        this.fillTable();
        return false;
      }
      time = moment(time, 'HH:mm').add(30, 'minutes').format('HH:mm');
    }
    //saves the data
    if (this.reservationType == "offices"){
      this.officeService.addReservation(this.data.id, 1, 'Rezervácia', date, length*30).subscribe(
        data => { },
        error => { alert(error); },
        () => { this.updateWeek(); }
      );
    } else {
      this.carService.addReservation(this.data.id, 1, 'Rezervácia', date, length*30).subscribe(
        data => { },
        error => { alert(error); },
        () => { this.updateWeek(); }
      );
    }
  }

  moveFor() {
    this.week += 1;
    this.updateWeek();
  }

  moveBack() {
    this.week -= 1;
    this.updateWeek();
  }

  updateWeek() {
    this.days = JSON.parse('[]');
    for (var i = 1; i < 6; i++) {
      var day = moment().add(this.week, 'weeks').weekday(i).format("dd DD.MM.YY");
      this.days.push(day);
    }
    if (this.reservationType == "offices")
      this.updateDataOffices();
    else this.updateDataCars();
  }

  updateDataOffices() {
    this.officeService.getOfficeReservations(this.data.id, moment().add(this.week, 'weeks').weekday(1).format("DD.MM.YYYY"), moment().add(this.week, 'weeks').weekday(6).format("DD.MM.YYYY")).subscribe(
      data => {
        this.reservationsData = data.json()
      },
      error => console.log(error),
      () => {
        this.updateData()
      }
    );
  }

  updateDataCars() {
    this.carService.getCarReservations(this.data.id, moment().add(this.week, 'weeks').weekday(1).format("DD.MM.YYYY"), moment().add(this.week, 'weeks').weekday(6).format("DD.MM.YYYY")).subscribe(
      data => {
        this.reservationsData = data.json()
      },
      error => console.log(error),
      () => {
        this.updateData()
      }
    );
  }

  updateData() {
    //setting default data to 0
    for (var i = 0; i < this.times.length; i++) {
      this.tableData[this.times[i].time] = new Array();
      for (var j = 0; j < 5; j++)
        this.tableData[this.times[i].time][j] = 0;
    }

    //for each record, changes the setting
    for (var i = 0; i < this.reservationsData.length; i++) {
      var record = this.reservationsData[i], user:User;
      var time = moment(record.dateTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm"), endTime = moment(record.dateTime, "YYYY-MM-DD HH:mm:ss").add(record.length, 'minutes').format('HH:mm'), day = moment(record.dateTime, "YYYY-MM-DD HH:mm:ss").weekday() - 1;

      for (var j = 0; j < this.usersList.length; j++) { //finding the user whose reservation it is
        if (this.usersList[j].id == record.userId)
          user = this.usersList[j];
      }

      while (time < endTime) {
        if (time == moment(record.dateTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm"))
          this.tableData[time][day] = JSON.parse('{"userName": "' + user.name + ' ' + user.surname + '", "long": 0, "reservationName":"' + record.name + '"}');
        else this.tableData[time][day] = JSON.parse('{"userName": "", "long": 1}');
        time = moment(time, 'HH:mm').add(30, 'minutes').format('HH:mm');
      }
    }
    this.fillTable();
  }
}
