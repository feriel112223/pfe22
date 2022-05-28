import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  id= JSON.parse(localStorage.getItem("user")||'').id;
  nom= JSON.parse(localStorage.getItem("user")||'').Nom;
  prenom= JSON.parse(localStorage.getItem("user")||'').Prenom;
  

  constructor() { }

  ngOnInit(): void {
  }

}
