import {Component, OnInit} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CarService} from '../../../services/car.service';
import {Response} from "@angular/http";
import {DetailCarAdminComponent} from './detail/detail.car.admin.component';
import {Car} from '../../../models/car.model';

@Component({
  selector: 'cars-admin',
  templateUrl:'app/components/admin/cars/cars.admin.component.html',
  directives: [ROUTER_DIRECTIVES, DetailCarAdminComponent]
})



export class CarsAdminComponent implements OnInit{    /*onInit - spustanie pri inicializaci prvku*/
  public cars:Array<Car>;
  public carData:Car;
  private showCarWindow:boolean = false;

  constructor(private carService:CarService){ }

  ngOnInit(){
    this.getCars();
  }

  getCars() {
    this.carService.getCars()
      .subscribe(
        data => {this.cars = data.json()},
        error => console.error(error)
      );
  }

  deleteCar(id:string){
    if(confirm("Naozaj chcete vymazať vozidlo?")) {
      this.carService.removeCar(id).subscribe(
        data => {
        },
        error => {
          alert(error)
        },
        () => {
          this.getCars();
        }
      )
    }
  }

  newCar() {
    this.carData = new Car();
    this.windowOpen();
  }

  editCar(id:number){
    for(var i = 0; i < this.cars.length; i++){
      if(this.cars[i].id == id){
        this.carData = this.cars[i];
        break;
      }
    }
    this.windowOpen();
  }

  //opens detail.office.admin.component window
  windowOpen(){
    this.showCarWindow = true;
  }

  //closes detail.office.admin.component window
  windowClose(action: boolean){
    this.showCarWindow = action;
  }
}



