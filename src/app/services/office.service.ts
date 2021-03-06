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

  public getOffice(id: number) { //with equipment
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/rooms/'+id, {headers});
  }

  public getOfficeReservations(id:number, from:any, to:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:50909/api/reservations/rooms/byroom/'+id, JSON.stringify({from, to}), {headers});
  }

  public addOffice(office:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:50909/api/rooms',office, {headers});
  }

  public editOffice(id:string, office:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("http://localhost:50909/api/rooms/"+id, office, {headers});
  }

  public removeOffice(id: string) {
    return this.http.delete('http://localhost:50909/api/rooms/'+id);
  }

  public getEquipment(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/equipment/', {headers});
  }

  public addReservation(roomId: number, userId:number, name:string, date:string, length:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:50909/api/reservations/rooms/', JSON.stringify({roomId, userId, name, date, length}), {headers});
  }




}
