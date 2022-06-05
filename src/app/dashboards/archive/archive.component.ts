import { Component, OnInit } from '@angular/core';
import { DemandesService } from 'src/app/shared/services/demandes.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  demandes: any;


  constructor(private demandesServ: DemandesService, private toastr: ToastrService) {
    this.getAllDemande();
   }

  ngOnInit(): void {
  }
  getAllDemande(){
    console.log("hi")
    this.demandesServ.getAllDemande().subscribe((res : any)=>{
      this.demandes = res;
      console.log(res);

    },
    (err : any)=>{
      console.log(err);
      
    }
    )
  }

}
