import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Rx";


@Injectable()
export class OfficeService {
  hasRoleAdmin: boolean = false;

  constructor(private http: Http) {
  }

  public getOffices() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/rooms', { headers  } );
  }


}
