import {Component, OnInit} from  '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CarService} from '../../../services/car.service';
import {Response} from "@angular/http";
import {EditCarComponent} from './edit/edit.car';
import {Car} from './edit/car';



@Component({
  selector: 'cars-admin',
  templateUrl:'app/components/admin/cars/cars.admin.component.html',
  styleUrls: ['app/components/admin/cars/cars.admin.component.css'],
  directives: [ROUTER_DIRECTIVES, EditCarComponent]
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

  //opens edit.office.admin.component window
  windowOpen(){
    this.showCarWindow = true;
  }

  //closes edit.office.admin.component window
  windowClose(action: boolean){
    this.showCarWindow = action;
  }
}



