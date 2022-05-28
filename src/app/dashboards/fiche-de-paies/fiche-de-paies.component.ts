import { Component, OnInit,VERSION } from '@angular/core';


@Component({
  selector: 'app-fiche-de-paies',
  templateUrl: './fiche-de-paies.component.html',
  styleUrls: ['./fiche-de-paies.component.css']
})
export class FicheDePaiesComponent implements OnInit {
  showForm=false;
  

  constructor() { }
 

  ngOnInit(): void {
  }
  close(){
    this.showForm= !this.showForm;

  }
}
