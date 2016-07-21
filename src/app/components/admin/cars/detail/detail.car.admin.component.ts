/**
 * Created by tomas on 20.07.2016.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Car} from '../../../../models/car.model';
import {CarService} from '../../../../services/car.service';
import {Response} from "@angular/http";

@Component({
  selector: "car",
  templateUrl: 'app/components/admin/cars/detail/detail.car.admin.component.html',
  styleUrls: ['lib/css/modalWindow.css']
})

export class DetailCarAdminComponent {
  public error;
  public success;
  public carData:Car = new Car();

  @Input() carId:number;
  @Output() windowClose = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  constructor(private carService:CarService) { }

  ngOnInit() {
    if(this.carId)
      this.getData();
  }

  getData(){
    this.carService.getCar(this.carId).subscribe(
      data => {this.carData = data.json()},
      error => console.error(error)
    );
  }

  newCar(){
    let plate = this.carData.plate;  /*data su nacitane z ineho componentu*/
    let name = this.carData.name;
    this.carService.addCar(JSON.stringify({plate, name})).subscribe( /* volanie metody addCar s param*/
      data => {        /*vyhodnotenie podla return hodnoty requestu*/
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Vozidlo úspešne vytvorené.';
        this.carData = new Car();
        this.updateList.emit(true);
        //this.closeWindow();
      }
    );
  }

  editCar(){
    let id = this.carData.id
    let plate = this.carData.plate;
    let name = this.carData.name;

    this.carService.editCar(id, JSON.stringify({id, name, plate})).subscribe(
      data => {
      },
      error => {
        this.error = error;
      },
      () => {
        this.success = 'Vozidlo úspešne upravené.';
        this.updateList.emit(true);
        //this.closeWindow();
      }
    );
  }

  closeWindow(){
    this.windowClose.emit(false);
  }
}

