import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { User } from "@angular/fire/auth";
import { PopoverController } from '@ionic/angular'
import { UserDetails, Coordinates } from '../../interfaces/schema'
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { FunctionalitiesService } from 'src/app/services/functionalities.service';
import { ClimatiqService } from 'src/app/services/climatiq.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string | any = "Your emission is doing well 🎉";
  data: UserDetails | any = {
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
  userId:string|any;
  userLocationStack:Array<Coordinates> | undefined;
  

  getPercentage(prev:number|undefined, curr:number){
    let percentage:number | string | undefined;
    if(prev === undefined){
      percentage = 'N/A'
    } else {
      percentage = ((curr-prev)/prev)*100
    }
    return percentage
  }


  //Method to open popover for retreiving carbon info
  async openPopover(){
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'add-popover'
    })
    await popover.present()
  }
  deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }

  getDistanceFromLatLonInKm(lat1:number,lon1:number,lat2:number,lon2:number) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  

  //Methof to track journey by retreiving coordinates
  getCoordinates():void{
    this.appService.getCoordinates().then((coordinates)=>{
      let point:Coordinates = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      }
      this.userLocationStack?.push(point)
    })
    if(this.userLocationStack?.length == 2){
      const lat1 = this.userLocationStack[0].latitude;
      const lon1 = this.userLocationStack[0].longitude
      const lat2 = this.userLocationStack[1].latitude;
      const lon2 = this.userLocationStack[1].longitude

      const distance = this.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)
      this.appService.createToast(`You travelled ${distance} kilometers`)
    }
  }

  constructor(private firebaseService: FirebaseService,
              private climatiq:ClimatiqService,
              private popoverController:PopoverController,
              private appService:FunctionalitiesService) { 
      //console.log(this.data)
              }

  ngOnInit(): void {
    this.userId = this.firebaseService.userId
    this.firebaseService.getUserDocument('users', this.userId)
    .subscribe((response)=>{
      console.log(response)
      this.data = response;
    })
   this.percentage = this.getPercentage(this.data.carbonHistory?.pop()?.carbonAmount,this.data.totalCarbonThisMonth.carbonAmount)
  }

}
