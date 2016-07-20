/**
 * Created by tomas on 20.07.2016.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Car} from './car';
import {CarService} from '../../../../services/car.service';
import {Response} from "@angular/http";

@Component({
  selector: "car",
  templateUrl: 'app/components/admin/cars/edit/edit.car.html',
  styleUrls: ['lib/css/modalWindow.css']
})

export class EditCarComponent {
  public error;
  public success;

  constructor(private carService:CarService) { }

  @Input() carData:Car;
  @Output() windowClose = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  newCar(){
    let spz = this.carData.spz;  /*data su nacitane z ineho componentu*/
    let znacka = this.carData.znacka;
    this.carService.addCar(JSON.stringify({spz, znacka})).subscribe( /* volanie metody addCar s param*/
      data => {        /*vyhodnotenie podla return hodnoty requestu*/
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Miestnosť úspešne vytvorená.';
        this.carData = new Car();
        this.updateList.emit(true);
        //this.closeWindow();
      }
    );
  }

  editCar(){
    let id = this.carData.id
    let spz = this.carData.spz;
    let znacka = this.carData.znacka;

    this.carService.editCar(id, JSON.stringify({id, spz, znacka})).subscribe(
      data => {
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Miestnosť úspešne upravená.';
        this.updateList.emit(true);
        //this.closeWindow();
      }
    );
  }

  closeWindow(){
    this.windowClose.emit(false);
  }
}

