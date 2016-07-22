import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Rx";

@Injectable()
export class RolesService {

  constructor(private http: Http) {
  }

  public getRoles(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/roles', { headers  } );
  }

  public getRole(id:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:50909/api/roles/'+id, { headers  } );
  }

  public addRole(role:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:50909/api/roles',role, {headers});
  }

  public editRole(id:number, role:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("http://localhost:50909/api/roles/"+id, role, {headers});
  }

  public removeRole(id: string) {
    return this.http.delete('http://localhost:50909/api/roles/'+id);
  }


}



