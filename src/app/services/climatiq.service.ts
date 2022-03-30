import { Injectable } from '@angular/core';
import { Http, HttpHeaders, HttpOptions } from '@capacitor-community/http';
import { CloudStorageOptions, CloudMemoryOptions, CloudComputingOptions } from '../interfaces/cpuload';

@Injectable({
  providedIn: 'root'
})
export class ClimatiqService {
  key: string = 'X68EXK1GH0MXP5JAPS79KDQKDC8V';
  url: string = 'https://beta3.api.climatiq.io';
  httpHeader: HttpHeaders = {'Authorization':`Bearer ${this.key}`}

  constructor() { }

  async getCarbonEstimateFromVehicle(distance:number, unit:'km'|'mi'|'nmi'|'m'|'ft'="km", passengers:number=1, vehicle:string, fuel_source:string, engine_size:string, vehicle_age:string, vehicle_weight:string){
    const options:HttpOptions = {
      url: this.url+'/estimate',
      headers: this.httpHeader,
      data: {
        emission_factor: `passenger_vehicle-vehicle_type_${vehicle}-fuel_source_${fuel_source}-engine_size_${engine_size}-vehicle_age_${vehicle_age}-vehicle_weight_${vehicle_weight}`,
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

  async getCarbonEstimateFromFuel(volume:number, unit:'l'|'ml'|'m3'|'standard_cubic_foot'|'gallons_us', vehicle:string, fuel_source:string, engine_size:string, vehicle_age:string, vehicle_weight:string){
    const options:HttpOptions = {
      url: this.url+'/estimate',
      headers: this.httpHeader,
      data: {
        emission_factor: `passenger_vehicle-vehicle_type_${vehicle}-fuel_source_${fuel_source}-engine_size_${engine_size}-vehicle_age_${vehicle_age}-vehicle_weight_${vehicle_weight}`,
        parameters: JSON.stringify({
          volume: volume,
          volume_unit: unit
          //Unit of volume. One of l, ml, m3, standard_cubic_foot or gallons_us
        })
      }
    }
    await Http.post(options)
  }

  async getCarbonEstimateFromEnergyConsumption(energy:number, unit:'kWh'|'TJ'|'GJ'|'MMBTU'="kWh", vehicle:string, fuel_source:string, engine_size:string, vehicle_age:string, vehicle_weight:string){
    const options:HttpOptions = {
      url: this.url+'/estimate',
      headers: this.httpHeader,
      data: {
        emission_factor: `passenger_vehicle-vehicle_type_${vehicle}-fuel_source_${fuel_source}-engine_size_${engine_size}-vehicle_age_${vehicle_age}-vehicle_weight_${vehicle_weight}`,
        parameters: JSON.stringify({
          energy: energy,
          energy_unit: unit
          //Unit of energy. One of kWh, TJ, GJ or MMBTU
        })
      }
    }
    await Http.post(options)

  }

  //Industrial Cardon Processes
  async getCarbonEstimateFromCloudComputing(options:CloudComputingOptions){
    let total_cpu_load = 0
    for(let i of options.cpuData){
      total_cpu_load += (i.cpuCount*i.efficiency);
    }
    const average_cpu_load = (total_cpu_load)/options.coreCount;

    const opts:HttpOptions = {
      url:`https://beta3.api.climatiq.io/compute/${options.cloudProvider}/cpu`,
      headers: this.httpHeader,
      data: JSON.stringify({
        region: options.region,
        cpu_count: options.coreCount,
        duration: options.duration,
        cpu_load: average_cpu_load,
        duration_unit: options.timeUnit,
        data_unit: options.dataUnit
      })
    }

    return await Http.post(opts)
  }

  async getCarbonEstimateFromCloudStorage(options:CloudStorageOptions){
    const opts:HttpOptions = {
      url:`https://beta3.api.climatiq.io/compute/${options.cloudProvider}/storage`,
      headers: this.httpHeader,
      data: JSON.stringify({
        region: options.region,
        data_unit: options.dataUnit,
        duration: options.duration,
        duration_unit: options.timeUnit,
        data: options.dataAmount,
        storage_type: options.storageType
      })
    }
    return await Http.post(opts)
  }

  async getCarbonEstimateFromCloudMemory(options:CloudMemoryOptions){
    const opts:HttpOptions = {
      url:`https://beta3.api.climatiq.io/compute/${options.cloudProvider}/memory`,
      headers: this.httpHeader,
      data: JSON.stringify({
        region: options.region,
        data_unit: options.dataUnit,
        duration: options.duration,
        duration_unit: options.timeUnit,
        data: options.dataAmount,
      })
    }
    return await Http.post(opts)
  }

  
}

