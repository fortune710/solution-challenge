import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Network } from '@capacitor/network';
import { ModalController, ToastController } from '@ionic/angular';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class FunctionalitiesService {

  async createToast(text: string){
    const toast = await this.toastCtrl.create({
      message: text,
      buttons: [{text:'OK',role:'cancel'}]
    })
    return await toast.present();
  }

  async listenToNetworkStatus(){
    Network.addListener('networkStatusChange',(data)=>{
      data.connected ? Network.getStatus() : this.createToast("You are not connected to the internet");
    })
  }

  async createModal(props:any, presentingComponent:any){
    const modal = await this.modalCtrl.create({
      component: presentingComponent,
      componentProps: props
    })
  }

  async getPhoto(){
    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    })
    image.base64String += "data:image/jpeg;base64,"+image.base64String
    return image
  }

  async getCoordinates(){
    const coordinates = await Geolocation.getCurrentPosition()
    console.log(coordinates)
    return coordinates
  }

  async watchCoordinates(){
    const options:PositionOptions = {
      enableHighAccuracy: true,
      timeout: 20000
    }
    await Geolocation.watchPosition(options, (position)=>[
      
    ])
  }



  constructor(private toastCtrl:ToastController,
              private modalCtrl:ModalController) { }
}
