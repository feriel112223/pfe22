import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees:any;
  path ="http://127.0.0.1:8000/api";
  constructor(private http: HttpClient) {}
  
  
  postEmployee(data: any) : Observable<any>{
    return this.http.post<any>(this.path + "/employes" , data);
  }
  getEmployee() : Observable<any> {
    return this.http.get<any>(this.path + "/employes");
  }
  updateEmployee(data: any, id: number) : Observable<any> {
    return this.http.put<any>(this.path + "/employes/"+id, data);
  }
  deleteEmployee(id: number) {
    return this.http.delete<any>(this.path + "/employes/"+id );
  }
}
