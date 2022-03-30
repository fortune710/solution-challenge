import { Component, OnInit } from '@angular/core';
import { ClimatiqService } from 'src/app/services/climatiq.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  emissionType: string|any;
  carbonEmitted: number | any;
  
  //For vehicle transport
  distance:number | any;
  distanceUnit:string | any;
  passengers:number | any;
  vehicle:string | any;


  getDistance(event:any){
    this.distance = event.target.value
  }

  getDistanceUnit(event:any){
    this.distanceUnit = event.target.value
  }

  getPassengers(event:any){
    this.distanceUnit = event.target.value
  }


  //For fuel burning
  volume:number | any;
  volumeUnit:string | any;

  getVolume(event:any){
    this.volume = event.target.value
  }

  getVolumeUnit(event:any){
    this.volumeUnit = event.target.value
  }

  //for electricity consumption
  energy:number | any;
  energyUnit:string | any;


  getEnergy(event:any){
    this.energy = event.target.value
  }

  getEnergyUnit(event:any){
    this.energyUnit = event.target.value
  }


  getEmissionType(event:any){
    this.emissionType = event.target.value;
  }

  //Function to get carbon data from API and submit to cloud firestore
  getCarbonDataAndSubmit(type:string){
    switch(type){
      case 'transport':
        this.climatiq.getCarbonEstimateFromVehicle(this.distance, this.distanceUnit, this.passengers, this.vehicle)
        .then((result)=>{
          this.carbonEmitted = result.data.co2e
          this.firebase.updateUserCarbonAmount('users',this.firebase.userId,parseFloat(this.carbonEmitted.toFixed(3)))
        })
        break;

      case 'electricity':
        this.climatiq.getCarbonEstimateFromEnergyConsumption(this.energy, this.energyUnit)
        .then((result)=>{
          this.carbonEmitted = result.data.co2e
          this.firebase.updateUserCarbonAmount('users',this.firebase.userId,parseFloat(this.carbonEmitted.toFixed(3)))
        })
        break;

      case 'fuel':
        this.climatiq.getCarbonEstimateFromFuel(this.volume, this.volumeUnit)
        .then((result)=>{
          this.carbonEmitted = result.data.co2e
          this.firebase.updateUserCarbonAmount('users',this.firebase.userId,parseFloat(this.carbonEmitted.toFixed(3)))
        })
        break;
      }
  }


  constructor(private climatiq:ClimatiqService, private firebase:FirebaseService) { }

  ngOnInit(): void {
  }

}
