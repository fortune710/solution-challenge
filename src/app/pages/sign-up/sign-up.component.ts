import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserDetails } from 'src/app/interfaces/schema';
import { Router } from '@angular/router';
import { FunctionalitiesService } from 'src/app/services/functionalities.service';

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

  signUpForm: FormGroup | any
  
  getGender(event: any){
    this.gender = event.target.value;
  }
  
  signUp(){
    
    this.firebaseService.signUpWithEmail(this.signUpForm.value.password, this.signUpForm.value.email, this.gender, this.signUpForm.value.displayName)
    .then((details)=>{
      this.data.displayName = this.signUpForm.value.displayName
      this.firebaseService.createUserDocument('users',details?.uid, this.data)
    })
    .then(()=>{
      this.router.navigate(['/home'])
    })
    .catch((err)=>{
      let errCode = err.code
      switch(errCode){
        case 'auth/email-already-in-use':
          this.uiService.createToast("Email already in use");
          break;
        case 'auth/invalid-email':
          this.uiService.createToast("Email is not valid");
          break;
        case 'auth/operation-not-allowed':
          this.uiService.createToast("Operationnot allowed");
          break;
        case 'auth/weak-password':
          this.uiService.createToast("Your password is too weak!");
          break;
        default:
          this.uiService.createToast("There was an error creating your account")
          break;
      }
    })
  }
  
  constructor(private firebaseService: FirebaseService,
              private formBuilder: FormBuilder,
              private router:Router,
              private uiService:FunctionalitiesService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      displayName: [''],
      email: [''],
      password: [''],
    })
  }

}
