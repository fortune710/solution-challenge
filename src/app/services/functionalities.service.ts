import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { ModalController, ToastController } from '@ionic/angular';

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


  constructor(private toastCtrl:ToastController,
              private modalCtrl:ModalController) { }
}
