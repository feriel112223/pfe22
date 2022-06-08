import {  OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendrierService } from 'src/app/shared/services/calendrier.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
 
@Component({
  selector: 'app-calendrier-de-travail',
  templateUrl: './calendrier-de-travail.component.html',
  styleUrls: ['./calendrier-de-travail.component.css']
})
export class CalendrierDeTravailComponent implements OnInit {
  showForm=false;
  event:any
  dataEvent:any
  idEmploye= JSON.parse(localStorage.getItem("user")||'').id;
  closeResult:any
  Event_id :any
  testJour=false;
  evt:any = []
  element:any
  disable : any
  datepipe:any
  locale: string = 'fr';
  jourFerie=["2022-01-01","2022-03-20","2022-04-09","2022-05-01","2022-07-25","2022-08-13","2022-10-15","2022-12-17"
  ]


  
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  formEvent:FormGroup;
  CalendarView = CalendarView;
  calendarEvent:any=[]

  viewDate: Date = new Date();
  titleEvent:any=[]

  modalData?: {
    action: string;
    event: CalendarEvent;
    
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

 

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
     {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: this.titleEvent,
      color: colors.blue,
      actions: this.calendarEvent,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    
  ];

  activeDayIsOpen: boolean = true;
  role= JSON.parse(localStorage.getItem("user")||'').role;

  constructor(private modalService: NgbModal,private formbuilder:FormBuilder
    ,private calendrierServ:CalendrierService,private toastr: ToastrService,private employeeServ:EmployeeService) {
    this.formEvent = this.formbuilder.group({

      dateEvent :['', Validators.required],
      heureStart :['',Validators.required],
      heureEnd:['',Validators.required],
      event:['', Validators.required],
    })
    this.getAllEvent();
  }

 

  dayClicked({ date, events}: { date: Date; events: CalendarEvent[] }): void {
    
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }


  }

  getAllEvent(){
    this.calendrierServ.getEvent().subscribe((res : any)=>{
      this.calendarEvent = res;
      console.log(res);
      let evt = []
      this.calendarEvent.forEach((element:any) => {
        evt.push({
          heureStart: element.heureStart,
          heureEnd: element.heureEnd,
          dateEvent :element.dateEvent,
          title: element.event,
          color: colors.blue,
          // actions: this.calendarEvent,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        })
        // this.titleEvent.push(element.event)
      });


      this.events = evt
      console.log("hhh",this.evt)
      // console.log("hhhhhhhhhh",this.titleEvent);
      

    }),
    (err : any)=>{
      console.log(err);
      
    }
    
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }
  clickAddEvent(content:any){
    this.showForm= !this.showForm;

    this.formEvent.reset();
    this.openModal(content)
 }
 openModal(content:any){
  this.modalService.open(content,{size:"lg"})
}
  close(){
    this.showForm= !this.showForm;

   }
  // openModal(content:any){
   // this.modalService.open(content,{size:"lg"})
  //}

postEvent(){
   console.log("hhhhhhhh",this.formEvent.value);
  let start= this.formEvent.get('heureStart')?.value
  let end= this.formEvent.get('heureEnd')?.value
  let da= new Date(this.formEvent.get('dateEvent')?.value)
  // let dateNow=new Date()
  // let jNow=dateNow.getDay()
  // let mNow=dateNow.getMonth()
  // let yNow=dateNow.getFullYear()
  // let jEvent=da.getDay()
  // let mEvent=da.getMonth()
  // let yEvent=da.getFullYear()
  // let dd=new Date(yNow+"-"+mNow+"-"+jNow)
  // //console.log(da,"et",dateNow.getMonth());
  
  if(start > end){
    this.disable=true
  }

  // console.log(this.disable);
  
  this.jourFerie.forEach((element:any)=>{
    if (da==element)
    alert("c'est un jour férié")
    //console.log("jour ferié")
    this.testJour=true
  
  })
  if(this.disable)
    alert("veriifer vos informations")
  //  else  if(jNow!=jEvent && mNow!=mEvent && yNow!=yEvent )
  //   alert("veriifer vos informations ")
else{
  if(!this.testJour)
  {
    
    // let form={'dateEvent':this.formEvent.get('dateEvent')?.value,'event':this.formEvent.get('event')?.value,
    // }
    
  this.calendrierServ.postEvent(this.formEvent.value).subscribe((res:any)=>{
    // console.log(res);
    //console.log("nonono");
    
    this.getAllEvent()
    //this.toastr.success('Votre tache ajouté avec succés!');
    alert("Votre tache ajoutée avec succés!");
  }), (err:any)=>{
    alert("il y a un problème")
    console.log(err);
  }
  }
  else{
    this.calendrierServ.postEvent(this.formEvent.value).subscribe((res:any)=>{
      // console.log(res);
      //console.log("nonono");
      
      this.getAllEvent()
      this.toastr.success('Votre tache ajouté avec succés!');
      //alert("Votre tache ajouté avec succé!");
    }), (err:any)=>{
      
      console.log(err);
    }

  }
}
}

  // postEvent(){
  //   console.log(this.formEvent.value);
    
  // this.calendrierServ.postEvent(this.formEvent.value)
  // .subscribe((res:any)=>{
  //   console.log(res);
  //   alert("Votre tache ajouté avec succé!");
  //   let ref = document.getElementById('cancel')
  //   ref?.click();
  //   this.formEvent.reset();
  //   // return this.getAllEvent();
  //   this.getAllEvent()
  // },
  // err=>{
  //   alert("Il y'a un problèm!");
  // }
  // )
  // }

  addEvent(): void {
    

    const dateDeb  =new Date(this.formEvent.get('dateEvent')?.value )
    dateDeb.setHours(this.formEvent.get('heureStart')?.value.hour)
    dateDeb.setMinutes(this.formEvent.get('heureStart')?.value.minute)
    const dateFin  =new Date(this.formEvent.get('dateEvent')?.value )
    dateFin.setHours(this.formEvent.get('heureEnd')?.value.hour)
    dateFin.setMinutes(this.formEvent.get('heureEnd')?.value.minute)
    
    this.formEvent.get("heureStart")?.setValue(dateDeb)
    this.formEvent.get("heureEnd")?.setValue(dateFin)
    console.log("hhhhhhh",this.formEvent.get('dateEvent')?.value);
    
    this.events = [
      ...this.events,
      {
        title: this.formEvent.get('event')?.value,
        start: this.formEvent.get('heureStart')?.value,
        end: this.formEvent.get('heureEnd')?.value,
        color: colors.red,
        draggable: true,
       
      },
    ];
    // console.log(this.events);
    
   
    this.modalService.dismissAll()
  }

  

  deleteEvent(){
    this.calendrierServ.deleteEvent(this.Event_id)
    .subscribe(res=>{
      this.toastr.success('votre tache est supprimée ');
     
     
      this.getAllEvent();
    })
  }

  

 

  //deleteEvent(eventToDelete: CalendarEvent) {
    //this.events = this.events.filter((event) => event !== eventToDelete);
  //}

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
   

    //console.log("title",this.titleEvent);
    

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
    this.Event_id = element.id;
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


// geteventByemployeId(){
//   this.employeeServ.getEventByid(this.idEmploye)
//   .subscribe(res=>{
// this.event=res
//    console.log(res);

//    this.event.forEach((element:any) => {
//     this.dataEvent.push({
//       dateEvent:element.dateEvent,
   
//       heureTravail: element.heureEnd-element.heureStart
//     })
     
//    });

   
   
   
    
//   })
// }

// exportPdfPrime(shedule) {
//   const cols = [
//     { dataKey: 'event', title: 'tache' },
//     { dataKey: 'dateEvent', title: 'date' },
//     { dataKey: 'heureStart', title: ' debut' },
//     { dataKey: 'heureEnd', title: ' fin' },
    
//   ];
//   var shadowSchedule = shedule.emploiCec.ligneEmploiCecs.map((elem) => ({
//     date: this.datepipe.transform(new Date(elem.heureDebut), 'yyyy-MM-dd'),
//     HourStart: this.datepipe.transform(new Date(elem.heureDebut), 'h:mm '),
//     HourEnd: this.datepipe.transform(new Date(elem.heureFin), 'h:mm '),
//     professeur: elem.professeur.nom + ' ' + elem.professeur.prenom,
//     sousModule: elem.sousModuleCec.titre,
//   }));

//   // const doc = new jsPDF();
//   const doc = new jsPDF('p', 'pt');
//   var width = doc.internal.pageSize.getWidth();
//   doc.text(this.formEvent.controls.cec.value.titre, width / 2, 50, {
//     align: 'center',
//   });
//   doc.text(shedule.titre, 70, 120, {
//     align: 'left',
//   });
//   //  doc.text("Date:", width/2, 100, { align: 'center' });

//   // doc.text("Date:" +new Date(this.shedule.heureDebut), width/2, 170, { align: 'center' });
//   doc['autoTable'](cols, shadowSchedule, {
//     startY: 150,
//     styles: {
//       fontSize: 12,
//     },
//   });
//   doc.save('pv_+' + this.formEvent.controls.cec.value.titre + '.pdf');
// }








}
