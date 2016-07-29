import {Component, Input, OnInit, ElementRef, Inject, AfterViewInit} from '@angular/core';
import * as moment from 'moment';
import {User} from '../../../../models/user.admin.model';
import {UserService} from '../../../../services/user.service';
import {OfficeService} from '../../../../services/office.service';
import {CarService} from '../../../../services/car.service';
import {CellPipe} from "./CellPipe";


declare var $:any;


@Component({
  selector: 'reservation-table',
  templateUrl: 'app/components/home/reservations/table/table.reservations.component.html',
  styles: ['.glyphicon { margin-top: 10px; font-size: 16px; margin-bottom: 7px; cursor: pointer;}']

  // pipes: [CellPipe]
})

export class TableReservationComponent implements OnInit {
  @Input() data;
  @Input() reservationType;

  public week:number = 0;
  public days;
  public times = JSON.parse('[]');
  public tableData = new Array();
  public reservationsData;
  public usersList:Array<User>;

  constructor(private userService:UserService, private officeService:OfficeService, private carService:CarService) {
  }

  ngOnInit() {
    this.updateTime();
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
    var table = '', fromRow, fromCol, length = 0, isMouseDown = false, thisDocument=this;
    for (var i = 0; i < this.times.length; i++) {
      table += '<tr>';
      table += '<td>' + this.times[i].time + '</td>';
      for (let cell of this.tableData[this.times[i].time]) {
        if (cell.long == null) {
          table += '<td class="empty">&nbsp;&nbsp;&nbsp;</td>';
        } else {
          if (cell.reservationName == null) {
            table += '<td  class="bg-primary" style="border: none">&nbsp;&nbsp;&nbsp;</td>';
          } else {
            table += '<td class="bg-primary" style="border: none"><b><center>' + cell.reservationName + '</b><br>' + cell.userName + '</center></td>';
          }
        }
      }
      table += '</tr>';

    }
    $("#reservationTable"+this.data.id+" #records"+this.data.id).html(table);

    $("#reservationTable"+this.data.id+" td.empty").mouseenter(function (event) {
      var col = $(this).parent().children().index($(this));
      var row = $(this).parent().parent().children().index($(this).parent());

      $('#reservationTable'+thisDocument.data.id+' td:nth-child(' + ($(this).index() + 1) + ')')
        .mousedown(function () {
          isMouseDown = true;
          $(this).css({"background-color": "#5cb85c", "border": "none"});
          fromRow = row;
          fromCol = col;
          return false; //don't insert taxt in cell
        })
        .mouseover(function () {
          if (isMouseDown) {
            $(this).css({"background-color": "#5cb85c", "border": "none"});
          }
        })
        .mouseup(function () {
          length = row - fromRow + 1;
        })
    });

    $(document)
      .mouseup(function () {
        if(isMouseDown) {
          thisDocument.makeReservation(fromRow, fromCol, length);
          isMouseDown = false;
        }
      });
  }

  makeReservation(fromRow:number, fromCol:number, length:number) {
      console.log(fromRow + ' ' + fromCol + ' ' + length);
      this.carService.addReservation(1, '28.07.2016 8:30:00', 1, 90).subscribe(
        data => {
        },
        error => {
          alert(error);
        },
        () => {
          this.updateWeek();
        }
      );

      // this.updateWeek();
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

  updateTime() {
    for (var i = 7; i < 18; i++) {
      for (var j = 0; j < 2; j++) {
        var time = moment().hour(i).minute(j * 30).format('HH:mm');
        this.times.push({'time': time});
      }
    }
  }

  updateDataOffices() {
    this.officeService.getOfficeReservations(this.data.id, moment().add(this.week, 'weeks').weekday(1).format("DD.MM.YYYY"), moment().add(this.week, 'weeks').weekday(5).format("DD.MM.YYYY")).subscribe(
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
    this.carService.getCarReservations(this.data.id, moment().add(this.week, 'weeks').weekday(1).format("DD.MM.YYYY"), moment().add(this.week, 'weeks').weekday(5).format("DD.MM.YYYY")).subscribe(
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
