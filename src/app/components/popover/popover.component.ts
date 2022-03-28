import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  emissionType: string|any;

  getEmissionType(event:any){
    this.emissionType = event.target.value;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
