import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id= JSON.parse(localStorage.getItem("user")||'').id;
  role= JSON.parse(localStorage.getItem("user")||'').role;
  nom= JSON.parse(localStorage.getItem("user")||'').Nom;
  prenom= JSON.parse(localStorage.getItem("user")||'').Prenom;
  image= JSON.parse(localStorage.getItem("user")||'').image;

  
  

  constructor(private auth:AuthService,private router:Router) { }
  dropDownProfil='none';
  dropDownNotification='none';
  ngOnInit(): void {

    // console.log("heyy nav ",this.data)
  }
  navigateto(){
    this.router.navigate(['/home/listedemandes'])
  }

  toggleDropDown(){
    if(this.dropDownProfil=="block"){
    this.dropDownProfil="none"
    }else{
    this.dropDownProfil="block"

    }
  }
  toggleDropDownN(){
    if(this.dropDownNotification=="block"){
      this.dropDownNotification="none"
      }else{
      this.dropDownNotification="block"
  
      }

  }
  
  logout() {
    this.auth.logout();
  }
  
}
