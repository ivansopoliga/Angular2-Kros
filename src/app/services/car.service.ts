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


}
