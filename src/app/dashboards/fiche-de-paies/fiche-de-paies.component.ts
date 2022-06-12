import { Component, OnInit,VERSION } from '@angular/core';
import { FicheService } from 'src/app/shared/services/fiche.service';



@Component({
  selector: 'app-fiche-de-paies',
  templateUrl: './fiche-de-paies.component.html',
  styleUrls: ['./fiche-de-paies.component.css']
})
export class FicheDePaiesComponent implements OnInit {
  showForm=false;
  fiche: any
   role= JSON.parse(localStorage.getItem("user")||'').role;

  constructor(private ficheServ: FicheService) {
   
   }
 

  ngOnInit(): void {
  }
  close(){
    this.showForm= !this.showForm;

  }
  // getAllfiche(){
  //   console.log("hi")
  //   this.ficheServ.getAllfiche().subscribe((res : any)=>{
  //     this.fiche = res;
  //     console.log(res);

  //   },
  //   (err : any)=>{
  //     console.log(err);
      
  //   }
  //   )
  // }
}

