import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserDetails } from 'src/app/interfaces/schema';
import { Router } from '@angular/router';
import { FunctionalitiesService } from 'src/app/services/functionalities.service';

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

  logInForm: FormGroup | any
  
  getGender(event: any){
    this.gender = event.target.value;
  }

  logIn(){
    console.log(this.logInForm.value)
    
    this.firebaseService.signInWithEmail(this.logInForm.value.password, this.logInForm.value.email)
    .then((details)=>{
      this.firebaseService.getUserDocument('users',details?.uid)
    })
    .then(()=>{
      this.router.navigate(['/home'])
    })  
    .catch((err)=>{
      let errCode = err.code;
      switch(errCode){
        case 'auth/wrong-password':
          this.uiService.createToast("Password does not match the account");
          break;
        default:
          this.uiService.createToast("There was an error while logging in");
          break;
      }
    })
  }

  constructor(private firebaseService: FirebaseService,
              private formBuilder: FormBuilder,
              private router:Router,
              private uiService:FunctionalitiesService) { }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      displayName: [''],
      email: [''],
      password: [''],
    })
  }

}


