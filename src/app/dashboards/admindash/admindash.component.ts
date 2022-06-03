import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { CalendrierService } from 'src/app/shared/services/calendrier.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {
  data=localStorage.getItem("user")||'';
  event:any

  dataEvent :any=[]
  idEmploye= JSON.parse(localStorage.getItem("user")||'').id;

    canvas: any;
    ctx: any;
    @ViewChild('mychart') mychart:any;
  
    ngAfterViewInit() {
      this.canvas = this.mychart.nativeElement; 
      this.ctx = this.canvas.getContext('2d');
  
      new Chart(this.ctx, {
        type: 'radar',
        data: {
            datasets: [{
                label: 'Current Vallue',
                data: [0, 20, 40, 50],
                backgroundColor: "rgb(115 185 243 / 65%)",
                borderColor: "#007ee7",
                fill: true,
            },
            {
              label: 'Invested Amount',
              data: [0, 20, 40, 60, 80],
              backgroundColor: "#47a0e8",
              borderColor: "#007ee7",
              fill: true,
          }],
            labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019','juillet 2022']
        },
    });
  }

  constructor(private employeeServ:EmployeeService,) { }

  ngOnInit(): void {
  }

}
