import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeService } from 'src/app/shared/services/employee.service';


@Component({
  selector: 'app-emloyee',
  templateUrl: './emloyee.component.html',
  styleUrls: ['./emloyee.component.css']
})
export class EmloyeeComponent implements OnInit {
  employees:any;
  formEmployee:FormGroup;
  employee_id:any;
  showForm=false;
  model2 = { option: '' };
  radioItems2: any;
  showAdd: boolean = false;
  showUpdate : boolean = false;
  closeResult:any
  imageSrc: string = '';
  image:any =['']
  filterTerm!: string;

  role= JSON.parse(localStorage.getItem("user")||'').role;

  
  
   constructor(private employeesServ:EmployeeService ,private formbuilder:FormBuilder,private toastr: ToastrService,
    private modalService: NgbModal) {


      this.radioItems2 = [
        { name: 'Femme', value: 'femme' },
        { name: 'Homme', value: 'homme' },
      ];
      
     this.formEmployee  = this.formbuilder.group({
       

       cin :['', Validators.required],
       Nom :['',Validators.required],
       Prenom :['',Validators.required],
       sexe:['', Validators.required],
       date_nais:['',Validators.required],
       email: ['', Validators.compose([
        Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]{0,10})*@[A-Za-z0-9]+(\\.[A-Za-z0-9]{0,10})*(\\.[A-Za-z]{0,5})$'),
        Validators.required])],
       mot_de_passe:['',Validators.required], 
       grade:['', Validators.required],
       salaire:['',Validators.required],
       tel :['',Validators.required],
       role :['EMPLOYE',Validators.required],
       image:[null,Validators.required]
       
       

     })
     this.getAllEmployee();
    }
 
   ngOnInit(): void {
      //console.log(this.employeesServ.getAllEmployees());
      //this.employees=this.employeesServ.getAllEmployees();
      
   }


   onFileChanged(event:any) {
    // for (const property in event.target.files) {
    //   this.imageFile.push(property);
    //   console.log(this.image);
    // }
    const files = event.target.files;
    if (files)
      for (const f of files) {
        this.image.push(f);
      }
    // console.log("heloo", event.target.files);
    // this.imageFile.push(event.target.files[0]);
    console.log(this.image);
  }

   clickAddEmployee(content:any){
      this.showForm= !this.showForm;

      this.formEmployee.reset();
      this.showAdd = true;
      this.showUpdate = false;
      this.openModal(content)
   }
   close(){
    this.showForm= !this.showForm;

   }
   openModal(content:any){
    this.modalService.open(content,{size:"lg"})
  }
 
 postEmployeeDetails()
   {
     console.log(this.formEmployee.value)
    this.employeesServ.postEmployee(this.formEmployee.value)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success('Employ??  ajout?? avec succ??s ');
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formEmployee.reset();
      return this.getAllEmployee();
    },
    err=>{
      this.toastr.error('Il y a un probl??m ');
    }
    )
     /* console.log(this.formEmployee.get('Nom')?.value);
     console.log(this.formEmployee.get('Prenom')?.value);
     console.log(this.formEmployee.get('sexe')?.value);
     console.log(this.formEmployee.get('cin')?.value);
     console.log(this.formEmployee.get('date')?.value);
     console.log(this.formEmployee.get('email')?.value);
     console.log(this.formEmployee.get('tel')?.value);
     console.log(this.formEmployee.get('adresse')?.value);
     
   */
  /*
     this.toastr.success('Employ??  ajout?? avec succ??e ');
     console.log(this.formEmployee.value);
      */

  }
   
    
   getAllEmployee(){
    this.employeesServ.getEmployee().subscribe((res : any)=>{
      this.employees = res;
      this.employees.filter((item:any)=>item.role=="EMPLOYE")
      console.log(res);

    },
    (err : any)=>{
      console.log(err);
      
    }
    )
  }
 
  onUpdate(employee : any , content:any){
    this.showAdd = false;
    this.openModal(content)
    this.showUpdate = true;
    this.formEmployee.controls['cin'].setValue(employee.cin);
    this.formEmployee.controls['Nom'].setValue(employee.Nom);
    this.formEmployee.controls['Prenom'].setValue(employee.Prenom);
    this.formEmployee.controls['sexe'].setValue(employee.sexe);
    this.formEmployee.controls['date_nais'].setValue(employee.date_nais);
    this.formEmployee.controls['email'].setValue(employee.email);
    this.formEmployee.controls['mot_de_passe'].setValue(employee.mot_de_passe);
    this.formEmployee.controls['tel'].setValue(employee.tel);
    this.formEmployee.controls['grade'].setValue(employee.grade);
    this.formEmployee.controls['salaire'].setValue(employee.salaire);


   
  }
  updateEmployeeDetails(){
    this.employees.id = JSON.parse(localStorage.getItem('user')).id
    this.employees = this.formEmployee.value;
/*     this.employees.cin = this.formEmployee.value.cin;
    this.employees.Nom = this.formEmployee.value.Nom;
    this.employees.Prenom = this.formEmployee.value.Prenom;
    this.employees.sexe = this.formEmployee.value.sexe;
    this.employees.date_nais = this.formEmployee.value.date_nais;
    this.employees.email = this.formEmployee.value.email;
    this.employees.mot_de_passe = this.formEmployee.value.mot_de_passe;    
    this.employees.tel = this.formEmployee.value.tel;
    this.employees.grade = this.formEmployee.value.grade; */
    this.employees.role = "EMPLOYE";
  //  this.employees.salaire = this.formEmployee.value.salaire;
  // console.log(this.employees)

    this.employeesServ.updateEmployee(this.employees,JSON.parse(localStorage.getItem('user')).id)
    .subscribe((res : any)=>{
      this.toastr.success('Employ?? modifi?? avec succ??s ');
      //alert("Employ?? modifi?? avec succ??e ! ");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formEmployee.reset();
      this.getAllEmployee();
    },
    (err:any)=>{
      this.toastr.error('Il y a un probl??me ');
      //alert("Il y'a un probl??m!");
    })

  }
  deleteEmployee(employee : any){
    this.employeesServ.deleteEmployee(this.employee_id)
    .subscribe(res=>{
      this.toastr.success('Employ??  supprim??');
     // alert('Employ??  supprim?? !');
     
      this.getAllEmployee();
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
    this.employee_id = element.id;
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

  }
}
  
  
 
  
   
 
 