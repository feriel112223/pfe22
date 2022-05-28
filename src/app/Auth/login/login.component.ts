import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  data:any
  loginForm : FormGroup
  


  constructor(private auth:AuthService,private formbuilder: FormBuilder,) { 
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]{0,10})*@[A-Za-z0-9]+(\\.[A-Za-z0-9]{0,10})*(\\.[A-Za-z]{0,5})$'),
        Validators.required])],
      mot_de_passe: ['', Validators.required],
    });
  }
  

  ngOnInit(): void {
    
  }
  loginUser(){
    console.log(this.loginForm.value);
    
    this.auth.loginUser(this.loginForm.value)
    .subscribe((res:any)=>{
      console.log("goaalll",res);
      
      this.data=res
      this.auth.saveToken(this.data)

      // console.log(res);
      
    }), (err:any) => console.log(err)}
     
      
      
   
  
 



}