import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[verticalPan]'
})
export class VerticalPanDirective {
  //Bindi the height of the bottom panel to a height variable
  @HostBinding('style.height') height!: string;

  clicked: boolean = false;
  //Listen to an event, which is drag
  @HostListener('click') increaseHeight(){
    this.clicked = !this.clicked;
    this.clicked ? this.height = '450px' : this.height = '50px'
  }
  constructor() { }

}
