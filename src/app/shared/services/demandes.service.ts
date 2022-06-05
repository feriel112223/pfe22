import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DemandesService {
  demandes: any;
  path ="http://localhost:8000/api";

  constructor(private http: HttpClient) {
  }

  /**
   * test
   */
 

  postDemande(data: any) {
    return this.http.post<any>(this.path + "/conges", data);
  }
  getAllDemande() {
    return this.http.get<any>(this.path + "/conges");
  }
  updateDemande(data: any, id: number) {
    return this.http.put<any>(this.path + "/conges/" + id, data);
  }
  accepterEtat( id: number) {
    return this.http.put<any>( this.path + "/conges/refuse/" + id ,"");
  }
  refuserEtat( id: number) {
    return this.http.put<any>(this.path + "/conges/refuse/" + id ,"");
  }
  deleteDemande(id: number) {
    return this.http.delete<any>(this.path + "/conges/"+ id);
  }
}
