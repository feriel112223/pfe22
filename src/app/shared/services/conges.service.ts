import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CongesService {
  conges: any;
  path ="http://127.0.0.1:8000/api";
  constructor(private http: HttpClient) {
    this.conges = [
      {
        Nom:'abbes',
        Prenom:'feriel',
        type:'Autorisation',
        hdebut:'jjj',
        hfin:'hhh',
        description:'aaaa',
        
      },
      {
        
        Nom:'Benali',
        Prenom:'ahmed',
        type:'congés sans solde',
        hdebut:'ddddd',
        hfin:'hhhh',
        description:'hhhhhh',
          
      }
      
        ];
  }

  /**
   * test
   */
  getAllConges(){
    return this.conges;
  }

  postConges(data: any) {
    return this.http.post<any>('', data);
  }
  getConges() {
    return this.http.get<any>('');
  }
  updateConges(data: any, id: number) {
    return this.http.put<any>(' ' + id, data);
  }
  deleteConges(id: number) {
    return this.http.delete<any>('' + id);
  }
}
