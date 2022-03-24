import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { User } from "@angular/fire/auth";
import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string | any;
  data: any;
  user: User | any = this.firebaseService.auth.currentUser

  constructor(private firebaseService: FirebaseService,
              private platform: Platform) { 
                this.data = localStorage.getItem('data')
                //console.log(this.data)
              }

  ngOnInit(): void {
    console.log(this.user?.uid)
    this.firebaseService.getUserDocument('users', this.user?.uid)
    .then((response)=>{
      this.data = response
    })


    if(this.platform.is('mobileweb')){
      localStorage.setItem('data', this.data)
    }
  }

}
