import { Component, OnInit } from '@angular/core';
import { CongesService } from 'src/app/shared/services/conges.service';
import { DemandesService } from 'src/app/shared/services/demandes.service';


@Component({
  selector: 'app-adminconges',
  templateUrl: './adminconges.component.html',
  styleUrls: ['./adminconges.component.css']
})
export class AdmincongesComponent implements OnInit {
listConge:any
  constructor(private demandeServ:DemandesService) { }

  ngOnInit(): void {
  }


  getAllconge(){
    this.demandeServ.getAllDemande().subscribe((res : any)=>{
      this.listConge = res;
      console.log(this.listConge);
     
      

    }),
    (err : any)=>{
      console.log(err);
      
    }

  }
}
