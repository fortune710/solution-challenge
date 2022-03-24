import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  signUpForm: FormGroup | any
  
  getName(event:any){
    this.displayName = event.target.value;
  }
  
  getEmail(event:any){
    this.email = event.target.value;
  }
  
  getPassword(event:any){
    this.password = event.target.value;
  }
  
  signUp(){
    console.log(this.signUpForm.value)
    /*
    this.firebaseService.signUpWithEmail(this.password, this.email, this.gender, this.displayName)
    .then((details)=>{
      const user:User|any = details
      this.firebaseService.createUserDocument('users',user.uid, this.data)
    })*/
  }
  
  constructor(private firebaseService: FirebaseService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      displayName: [''],
      email: [''],
      password: [''],
    })
  }

}
