import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { User } from "@angular/fire/auth";
import { LoadingController, PopoverController } from '@ionic/angular'
import { UserDetails, Coordinates } from '../../interfaces/schema'
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { FunctionalitiesService } from 'src/app/services/functionalities.service';
import { ClimatiqService } from 'src/app/services/climatiq.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string | any = "Your emission is doing well 🎉";
  percentUsed: number = 0
  
  data: UserDetails | any;

  percentage: number | any = 0;
  budgetRemaining: number | any;
  userId:string|any;
  userLocationStack:Array<Coordinates> = [] ;

  buttonText: string | any = 'Track your Journey';
  clicked = false;
  

  getPercentage(prev:number|undefined, curr:number){
    let percentage:number | string | undefined;
    if(prev === undefined){
      percentage = 0
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
    console.log(this.userLocationStack)
    this.clicked = !this.clicked
    if(this.clicked){
      this.buttonText = 'Tracking in Progress...';
      this.appService.createToast("Journey Tracking in progress...")
    } else {
      this.buttonText = 'Track your Journey';
    } 
  }

  doRefresh(event:any){
    //Get documents from firestore
    const id = this.firebaseService.userId
    this.firebaseService.getUserDocument('users', id)
    .subscribe(async(res)=>{
      this.data = res;
      this.budgetRemaining = this.data.carbonBudgetForMonth - this.data.totalCarbonThisMonth.carbonAmount
      this.percentage = this.getPercentage(this.data.carbonHistory?.pop()?.carbonAmount,this.data.totalCarbonThisMonth.carbonAmount)
      
      const carbonThisMonth = res.totalCarbonThisMonth.carbonAmount
      const budget = res.carbonBudgetForMonth
      this.percentUsed = (carbonThisMonth/budget)*100
      
      
      //Dismiss the refresher
      event.target.complete()
    })

  }

  async firebaseLoading(){
    const loading = await this.loadingController.create({
      message: 'Getting your footprint...',
      cssClass: 'firebase-loading'
    })
    await loading.present()

    //Get documents from firestore
    const id = this.firebaseService.userId
    this.firebaseService.getUserDocument('users', id)
    .subscribe(async(res)=>{
      this.data = res;
      this.budgetRemaining = this.data.carbonBudgetForMonth - this.data.totalCarbonThisMonth.carbonAmount
      this.percentage = this.getPercentage(this.data.carbonHistory?.pop()?.carbonAmount,this.data.totalCarbonThisMonth.carbonAmount)
      
      const carbonThisMonth = res.totalCarbonThisMonth.carbonAmount
      const budget = res.carbonBudgetForMonth
      this.percentUsed = (carbonThisMonth/budget)*100
      
      
      //Dismiss the loader
      await loading.dismiss()
    })
    

  }

  newBudget: number = 0
  getNewBudget(event:any){
    this.newBudget = parseFloat(event.target.value);
  }

  signOut(){
    this.firebaseService.signOut().then(() => this.router.navigate(['/login']))
  }

  constructor(public firebaseService: FirebaseService,
              private popoverController:PopoverController,
              private appService:FunctionalitiesService,
              private loadingController:LoadingController,
              private router:Router) { 
      //console.log(this.data)
  
              }

  ngOnInit(): void {
    this.firebaseLoading()
  }

}
