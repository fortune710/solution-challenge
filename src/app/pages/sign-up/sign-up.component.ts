import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email: string = '';
  password: string = '';
  displayName: string = '';
  gender: string = '';
  data:any = {};

  signUp(){
    this.firebaseService.signUpWithEmail(this.password, this.email, this.gender, this.displayName)
    .then((details)=>{
      const user:any = details
      this.firebaseService.createUserDocument('users',user.uid, this.data)
    })
  }
  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

}
