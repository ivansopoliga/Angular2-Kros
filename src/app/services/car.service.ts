/**
 * Created by tomas on 20.07.2016.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Rx";


@Injectable()
export class CarService {
  hasRoleAdmin: boolean = false;

  constructor(private http: Http) {
  }

  public getCars() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/cars', { headers  } ); /*headers tu nemusi byt*/
  }

  public getCar(id:number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/cars/'+id, { headers  } ); /*headers tu nemusi byt*/
  }

  public getCarReservations(id:number, from:any, to:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:50909/api/reservations/cars/bycar/'+id, JSON.stringify({from, to}), {headers});
  }

  public addCar(car:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:50909/api/cars',car, {headers});
  }

  public editCar(id:string, car:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("http://localhost:50909/api/cars/"+id, car, {headers});
  }

  public removeCar(id: string) {
    return this.http.delete('http://localhost:50909/api/cars/'+id);
  }

  public addReservation(carId: number, userId:number, name:string, date:string, length:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:50909/api/reservations/cars/', JSON.stringify({carId, userId, name, date, length}), {headers});
  }



}
