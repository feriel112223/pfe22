import { Component, OnInit } from '@angular/core';


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
  
  

  constructor() { }
  dropDownProfil='none';
  dropDownNotification='none';
  ngOnInit(): void {

    // console.log("heyy nav ",this.data)
  }

  // toggleDropDown(){
  //   if(this.dropDownProfil=="block"){
  //   this.dropDownProfil="none"
  //   }else{
  //   this.dropDownProfil="block"

  //   }
  // }
  // toggleDropDownN(){
  //   if(this.dropDownNotification=="block"){
  //     this.dropDownNotification="none"
  //     }else{
  //     this.dropDownNotification="block"
  
  //     }

  // }
  
}
