import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  data=localStorage.getItem("user")||'';
    canvas: any;
    ctx: any;
    @ViewChild('mychart') mychart:any;
  
    ngAfterViewInit() {
      this.canvas = this.mychart.nativeElement; 
      this.ctx = this.canvas.getContext('2d');
  
      new Chart(this.ctx, {
        type: 'line',
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
  constructor() { }

  ngOnInit(): void {
    console.log("goalll  bedis ",this.data)
  }
 

}
