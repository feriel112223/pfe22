import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { EmptyError } from 'rxjs';
import { CalendrierService } from 'src/app/shared/services/calendrier.service';
import { DemandesService } from 'src/app/shared/services/demandes.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  data=localStorage.getItem("user")||'';
  event:any
  allDemande:any
  refuse:any
  monthArray:any=[]
  nbAccepte:any
  nbRefuse:any
  nbAttente:any
  accepte:any
  month:any=[]
  enAttente:any
dateRefuse:any=[]
dateAccepte:any=[]
dateAttente:any=[]
  dataEvent :any=[]
  idEmploye= JSON.parse(localStorage.getItem("user")||'').id;
    canvas: any;
    ctx: any;
    @ViewChild('mychart') mychart:any;
  
    // ngAfterViewInit() {
      // this.getAllDemande()
      // this.chart()
      
    //   this.canvas = this.mychart.nativeElement; 
    //   this.ctx = this.canvas.getContext('2d');
  
    //   new Chart(this.ctx, {
    //     type: 'bar',
    //     data: {
    //         datasets: [{
    //             label: 'Demande Accepte',
    //             data: this.nbAccepte,
    //             backgroundColor: "rgb(115 185 243 / 65%)",
    //             borderColor: "#007ee7",
    //             fill: true,
    //         },
    //         {
    //           label: 'Mois',
    //           data: this.month,
    //           backgroundColor: "#47a0e8",
    //           borderColor: "#007ee7",
    //           fill: true,
    //       }],
    //       labels:this.month
    //           // labels: ['Janvier ', 'Février', 'Mars', 'Avril','Mai','juin','juillet','aout','Septembre','Octobre','Novembre','Decembre']
    //     },
    // });
    
   
    // }

    
  
      
  



  constructor(private employeeServ:EmployeeService,private toastr: ToastrService,private demandeServ:DemandesService) { }

  ngOnInit(): void {
    this.getAllDemande()
    this.getAllDemande()
   
    console.log("monthArray ",this.monthArray);
    
    // this.chart()
    // console.log("goalll  ",this.data)
    this.geteventByemployeId()
    this.chart()
  }






  chart(){
    const ctx = 'myChart';
    const myChart = new Chart(ctx, {
      type: 'bar',

      data: {
        // labels: this.monthArray,
           labels:[this.nbAccepte="demande accepte",this.nbRefuse="demande refuse",this.nbAttente="demande en attente"],
        datasets: [
          {
            label: 'Solde congé',

            data:[0,1,2,3,4,5,6,7,8,9],
            backgroundColor: [
              '#86E3CE',
              '#7FACD6',
              '#BFB8DA',
              '#AE6378',
              '#43978D',
              '#264D59',
              '#FD8F52',
              '#522157',
              'red',
              '#DCB665',
              '#CD7672',
              '#DE5B6D',
              '#CBE54E',
              '#88CDF6',
              '#264D59',
              '#F9E07F',
              '#C6A477',
              '#86E3CE',
              '#DCB665',
              '#CD7672',
              '#DE5B6D',
              '#CBE54E',
              '#88CDF6',
              '#264D59',
              '#F9E07F',
              '#C6A477',
              '#86E3CE',
            ],
            borderColor: [
              '#86E3CE',
              '#7FACD6',
              '#BFB8DA',
              '#AE6378',
              '#43978D',
              '#264D59',
              '#FD8F52',
              '#522157',
              'red',
              '#DCB665',
              '#CD7672',
              '#DE5B6D',
              '#CBE54E',
              '#88CDF6',
              '#264D59',
              '#F9E07F',
              '#C6A477',
              '#86E3CE',
              '#DCB665',
              '#CD7672',
              '#DE5B6D',
              '#CBE54E',
              '#88CDF6',
              '#264D59',
              '#F9E07F',
              '#C6A477',
              '#86E3CE',
              
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

getAllDemande(){
  this.demandeServ.getAllDemande().subscribe((res:any)=>{
    this.allDemande=res
  this.refuse = this.allDemande.filter(item=>item.etat=='refuse')
  this.nbRefuse=this.refuse.length
  
  this.accepte = this.allDemande.filter(item=>item.etat=='accepte')
  this.nbAccepte=this.accepte.length
  this.enAttente = this.allDemande.filter(item=>item.etat=='en_attente')
  this.nbAttente=this.enAttente.length
  this.dateRefuse=this.refuse.map(item=>item.date_debut.substring(6,7))
  // console.log("test test",this.dateRefuse);
  console.log("hhh",this.nbRefuse);
  

  this.dateAccepte=this.accepte.map(item=>item.date_debut.substring(6,7))
  this.dateAttente=this.enAttente.map(item=>item.date_debut.substring(6,7))
  
  this.dateRefuse.forEach(element => {
    let month
    if (element=="1")
    month="janvier";
    else if(element=="2")
    month="février";
    else if(element=="3")
    month="mars";

    else if(element=="4")
    month="avril";

    else if(element=="5")
    month="mai";

    else if(element=="6")
    month="juin";

    else if(element=="7")
    month="juillet";
    else if(element=="8")
    month="aout";

    else if(element=="9")
    month="septembre";

    else if(element=="10")
    month="octobre";
    else if(element=="11")
    month="novembre";
    else 
    month="decembre";


this.month.push(month)


    
  });

  console.log("hqhhhfqkhfk",this.month);
  
  this.month.forEach(element => {
    this.monthArray.push(element)
  });

  })
}


  geteventByemployeId(){
    this.employeeServ.getEventByid(this.idEmploye)
    .subscribe(res=>{
this.event=res
     console.log(res);

     this.event.forEach((element:any) => {
      this.dataEvent.push({
        dateEvent:element.dateEvent,
     
        heureTravail: element.heureEnd-element.heureStart
      })
       
     });

     
     
     
      
    })
  }
 

}
