import { Component, OnInit } from '@angular/core';
import { DemandesService } from 'src/app/shared/services/demandes.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-adminconges',
  templateUrl: './adminconges.component.html',
  styleUrls: ['./adminconges.component.css']
})
export class AdmincongesComponent implements OnInit {
listConge:any

id= JSON.parse(localStorage.getItem("user")||'').id;
nom= JSON.parse(localStorage.getItem("user")||'').Nom;
prenom= JSON.parse(localStorage.getItem("user")||'').Prenom;
demandes: any;
filterTerm:any
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

  accepter(id:any){
this.demandesServ.accepterEtat(id).subscribe((res:any)=>{
 console.log("ok");
 

},(err : any)=>{
  console.log(err);
  
})
  }

  refuser(id:any){
    this.demandesServ.refuserEtat(id).subscribe((res:any)=>{
     console.log("ok");
     
    
    },(err : any)=>{
      console.log(err);
      
    })
  }
  archiver(id:any){
    this.demandesServ.archiverDemande(id).subscribe((res:any)=>{
     console.log("ok");
     
    
    },(err : any)=>{
      console.log(err);
      
    })
      }

}
