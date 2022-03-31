import { Component, OnInit } from '@angular/core';
import { ClimatiqService } from 'src/app/services/climatiq.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FunctionalitiesService } from 'src/app/services/functionalities.service';

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
    this.distance = parseFloat(event.target.value)
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
    this.volume = parseFloat(event.target.value)
  }

  getVolumeUnit(event:any){
    this.volumeUnit = event.target.value
  }

  //for electricity consumption
  energy:number | any;
  energyUnit:string | any;


  getEnergy(event:any){
    this.energy = parseFloat(event.target.value)
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
          this.firebase.updateUserCarbonAmount('users',this.firebase.userId, this.carbonEmitted)
        })
        .catch(()=>{
          this.uiService.createToast("Could not calculate your carbon emission")
        })
        break;

      case 'electricity':
        console.log(this.energy+1)
        this.climatiq.getCarbonEstimateFromEnergyConsumption(this.energy, this.energyUnit)
        .then((result)=>{
          this.carbonEmitted = result.data.co2e
          console.log(this.carbonEmitted)
          this.firebase.updateUserCarbonAmount('users',this.firebase.userId, this.carbonEmitted)
        })
        .catch(()=>{
          this.uiService.createToast("Could not calculate your carbon emission")
        })
        break;

      case 'fuel':
        this.climatiq.getCarbonEstimateFromFuel(this.volume, this.volumeUnit)
        .then((result)=>{
          this.carbonEmitted = result.data.co2e
          this.firebase.updateUserCarbonAmount('users',this.firebase.userId,this.carbonEmitted)
        })
        .catch(()=>{
          this.uiService.createToast("Could not calculate your carbon emission")
        })
        break;

      default:
        console.log("okay")
        break;
    }
      
  }


  constructor(private climatiq:ClimatiqService, 
              private firebase:FirebaseService,
              private uiService:FunctionalitiesService) { }

  ngOnInit(): void {
  }

}
