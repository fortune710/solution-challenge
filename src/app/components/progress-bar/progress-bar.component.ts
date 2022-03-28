import { Component, Input, OnInit } from '@angular/core';
import { CarbonAmountForUser, UserDetails } from 'src/app/interfaces/schema';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  data: UserDetails = {
    displayName: 'Fortune Alebiosu',
    totalCarbonThisMonth: {
      month: 2,
      year: 2022,
      carbonAmount: 250
    },
    carbonBudgetForMonth: 625,
    carbonHistory:[
      {
        month: 2,
        year: 2022,
        carbonAmount: 250
      },
      {
        month: 1,
        year: 2022,
        carbonAmount: 350
      },
      {
        month: 12,
        year: 2021,
        carbonAmount: 324
      },
      {
        month: 11,
        year: 2021,
        carbonAmount: 340
      },
      {
        month: 10,
        year: 2021,
        carbonAmount: 297
      },
    ]
  };
  percent:number = (this.data.totalCarbonThisMonth.carbonAmount/this.data.carbonBudgetForMonth)*100;
  
  constructor() { }
  
  ngOnInit(): void {
  }

}
