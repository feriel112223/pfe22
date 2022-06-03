import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DemandesService } from 'src/app/shared/services/demandes.service';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css'],
})
export class DemandesComponent implements OnInit {
  radioItems: any;
  congeTypes: any;
  model = { option: '' };
  model1 = { option1: '' };
  selectedConge: any;
  testJour=false;
  disable : any
  demandes: any;
  closeResult:any
  Demande_id :any
  formDemande: FormGroup;
  etat :any=['en attente']
  
  showAdd: boolean= false;
  showUpdate : boolean = false ;
  showForm: any;
  jourFerie=["2022-01-01","2022-03-20","2022-04-09","2022-05-01","2022-07-25","2022-08-13","2022-10-15","2022-12-17"
  ]
  constructor(
    private demandesServ: DemandesService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.radioItems = [
      { name: 'Conge solde', value: 'AvecSolde' },
      { name: 'Conge sans solde', value: 'SansSolde' },

    ];

   

    this.formDemande = this.formbuilder.group({
      ///Nom: ['', Validators.required],
      ///Prenom: ['', Validators.required],
      type_demande: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      heure_debut: ['', Validators.required],
      heure_fin: ['', Validators.required],
      description: [null],
     
    });

    this.getAllDemande();
  }

  ngOnInit(): void {
    this.getAllDemande()
    /*console.log(this.demandesServ.getAllDemandes());
    this.demandes = this.demandesServ.getAllDemandes();
    */
  }
  ///clickAddDemandes(){
  /// this.formDemande.reset();
  ///}
  clickAddDemandes( content:any) {
    this.showForm = !this.showForm;
    this.formDemande.reset();
      this.showAdd = true;
      this.showUpdate = false;
      this.openModal(content)

  }
  close() {
    this.showForm = !this.showForm;
  }

  openModal(content:any){
    this.modalService.open(content,{size:"lg"})
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
  postDemandeDetails()
   {
    {







     console.log(this.formDemande.value)
    this.demandesServ.postDemande(this.formDemande.value)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success('Demande ajouté avec succés');
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formDemande.reset();
      return this.getAllDemande();
    },
    err=>{
      this.toastr.error('Il y a un problème ');
    }
    )
  }
   }
   
  deleteDemande(Demande : any){
    this.demandesServ.deleteDemande(this.Demande_id)
    .subscribe((res : any )=>{
      this.toastr.success('Demande  supprimée ');
     this.getAllDemande();
     })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  openDelete(content: any, element: any) {
    this.Demande_id = element.id;
    this.modalService
      .open(content, )
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
     
}}

    



   
  

