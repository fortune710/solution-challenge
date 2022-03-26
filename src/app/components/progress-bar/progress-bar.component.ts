import { Component, Input, OnInit } from '@angular/core';
import { CarbonAmountForUser } from 'src/app/interfaces/schema';
@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input('data') data:CarbonAmountForUser | any;
  constructor() { }

  ngOnInit(): void {
  }

}
