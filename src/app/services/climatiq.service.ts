import { Injectable } from '@angular/core';
import { Http, HttpHeaders, HttpOptions } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class ClimatiqService {
  key: string = 'X68EXK1GH0MXP5JAPS79KDQKDC8V';
  url: string = 'https://beta3.api.climatiq.io';
  httpHeader: HttpHeaders = {'Authorization':`Bearer ${this.key}`}

  constructor() { }

  async getCarbonEstimateFromVehicle(distance:number, unit:string, passengers:number=1){
    const options:HttpOptions = {
      url: this.url+'/estimate',
      headers: this.httpHeader,
      data: {
        parameters: JSON.stringify({
          passengers: passengers,
          distance: distance,
          distance_unit: unit
          //Unit of distance. One of km, mi, nmi, m or ft. Default km
        })
      }
    }
    await Http.post(options)
  }

  async getCarbonEstimateFromFuel(volume:number, unit:string){
    const options:HttpOptions = {
      url: this.url+'/estimate',
      headers: this.httpHeader,
      data: {
        parameters: JSON.stringify({
          volume: volume,
          volume_unit: unit
          //Unit of volume. One of l, ml, m3, standard_cubic_foot or gallons_us
        })
      }
    }
    await Http.post(options)
  }

  async getCarbonEstimateFromEnergyConsumption(energy:number, unit:string="kWh"){
    const options:HttpOptions = {
      url: this.url+'/estimate',
      headers: this.httpHeader,
      data: {
        parameters: JSON.stringify({
          energy: energy,
          energy_unit: unit
          //Unit of energy. One of kWh, TJ, GJ or MMBTU
        })
      }
    }
    await Http.post(options)

  }
}
