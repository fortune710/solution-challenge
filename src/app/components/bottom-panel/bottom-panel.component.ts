import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/schema';

@Component({
  selector: 'bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss']
})
export class BottomPanelComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
