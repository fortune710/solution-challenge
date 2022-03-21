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

  async getCarbonEstimateFromVehicle(distance:number, unit:string){
    const options:HttpOptions = {
      url: this.url+'/estimate',
      headers: this.httpHeader,
      data: {
        parameters: JSON.stringify({
          distance: distance,
          distance_unit: unit
        })
      }
    }
    await Http.post(options)
  }
}
