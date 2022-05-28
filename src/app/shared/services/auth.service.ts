import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path ="http://127.0.0.1:8000/api/login";
  email : string = '';
  isLogin=false;
  info:any

  constructor(private http:HttpClient,private router:Router) { }
  // login
  loginUser(data:any): Observable<any>{
   this.isLogin=true;
   console.log(data)
   

    return this.http.post<any>(this.path,data);
  }
  saveToken(a:any){
    // localStorage.getItem("user");
   localStorage.setItem("user",JSON.stringify(a));
   this.info=a

  }
  // sign out
  logout(){
    this.isLogin=false;
   localStorage.removeItem("user");
   this.router.navigate(['/login']);


    
  }
  // forgot password
  forgotPassword(){

  }


}
