/**
 * Created by krosaci on 21.7.2016.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Rx";

@Injectable()
export class EquipmentService {
  hasRoleAdmin: boolean = false;
  constructor(private http: Http) {
  }


  public getEquipments(){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:50909/api/equipment', { headers  } );
  }

  public getEquipment(id:String){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/equipment'+id, { headers  } );
  }




  public addEquipment(equipment:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:50909/api/equipment',equipment, {headers});
  }

  public editEquipment(id:string, equipment:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("http://localhost:50909/api/equipment/"+id, equipment, {headers});
  }

  public removeEquipment(id: string) {
    return this.http.delete('http://localhost:50909/api/equipment/'+id);
  }


}



