import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DemandesService } from 'src/app/shared/services/demandes.service';

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
  demandes: any;
  formDemande: FormGroup;
  
  showAdd: boolean= false;
  showUpdate : boolean = false ;
  showForm: any;
  constructor(
    private demandesServ: DemandesService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.radioItems = [
      { name: 'Conge solde', value: 'congeSolde' },
      { name: 'Conge sans solde', value: 'congeSansSolde' },
      { name: 'Autorisation', value: 'autorisation' },

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
   
  deleteDemande(Demande : any){
    this.demandesServ.deleteDemande(Demande.id)
    .subscribe((res : any )=>{
      this.toastr.success('Demande  supprimée ');
      this.getAllDemande();
    })
  }

    

     
   
  
}
