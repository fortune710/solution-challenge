import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { User } from "@angular/fire/auth";
import { Platform, PopoverController } from '@ionic/angular'
import { UserDetails } from '../../interfaces/schema'
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string | any = "Your emission is doing well 🎉";
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

  percentage: number | string | any;
  budgetRemaining: number = this.data.carbonBudgetForMonth - this.data.totalCarbonThisMonth.carbonAmount
  user: User | any

  getPercentage(prev:number|undefined, curr:number){
    let percentage:number | string | undefined;
    if(prev === undefined){
      percentage = 'N/A'
    } else {
      percentage = ((curr-prev)/prev)*100
    }
    return percentage
  }

  async openPopover(){
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'add-popover'
    })
    await popover.present()
  }

  constructor(private firebaseService: FirebaseService,
              private platform: Platform, 
              private popoverController:PopoverController) { 
      //console.log(this.data)
              }

  ngOnInit(): void {
    /*
    this.user = this.firebaseService.user
    this.firebaseService.getUserDocument('users', this.user?.uid)
    .then((response)=>{
      this.data = response
    })*/
   this.percentage = this.getPercentage(this.data.carbonHistory?.pop()?.carbonAmount,this.data.totalCarbonThisMonth.carbonAmount)
  }

}
