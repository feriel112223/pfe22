import { Component, OnInit } from '@angular/core';
import { CongesService } from 'src/app/shared/services/conges.service';

@Component({
  selector: 'app-liste-conges',
  templateUrl: './liste-conges.component.html',
  styleUrls: ['./liste-conges.component.css']
})
export class ListeCongesComponent implements OnInit {
  conges:any;

  constructor(private congesServ:CongesService) { }

  ngOnInit(): void {
    console.log(this.congesServ.getAllConges());
    this.conges=this.congesServ.getAllConges();
  }


   

  

}
