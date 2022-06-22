import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  data:any
  loginForm : FormGroup

  


  constructor(private auth:AuthService,private formbuilder: FormBuilder,private router:Router,) { 
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
      if(this.data.role=='EMPLOYE')
      this.router.navigate(['/home/dashboard'])
      if(this.data.role=='ADMIN'){
        this.router.navigate(['/home/admindash'])
      }
      else if(this.data.role=='SUPERADMIN'){
        this.router.navigate(['/home/admindash'])

      }

      

      // console.log(res);
      
    }), (err:any) => {this.router.navigate(['/login'])
    alert ("vérifier vos informations")

    console.log(err)}
    }

     
      
      
   
  
 



}
