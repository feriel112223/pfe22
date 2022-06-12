import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FicheService {
  path ="http://localhost:8000/api";

  constructor(private http: HttpClient) { 
    // getAllfiche(){
    //   return this.http.get<any>(this.path +"/fiche/"+id);
    // }
  }
}
