import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserDetails } from 'src/app/interfaces/schema';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  displayName: string = '';
  gender: string = '';

  data:UserDetails = {
    displayName: this.displayName,
    carbonBudgetForMonth: 0,
    carbonHistory: [{
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear() + 1,
      carbonAmount: 0
    }],
    totalCarbonThisMonth: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear() + 1,
      carbonAmount: 0
    }
  };

  logInForm: FormGroup | any
  
  getGender(event: any){
    this.gender = event.target.value;
  }

  logIn(){
    console.log(this.logInForm.value)
    
    this.firebaseService.signInWithEmail(this.logInForm.value.password, this.logInForm.value.email)
    .then((details)=>{
      this.data.displayName = this.logInForm.value.displayName
      this.firebaseService.createUserDocument('users',details?.uid, this.data)
    })
  }

  constructor(private firebaseService: FirebaseService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      displayName: [''],
      email: [''],
      password: [''],
    })
  }

}


