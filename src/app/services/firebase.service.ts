import { Injectable } from '@angular/core';
import { Auth, 
         getAuth, 
         updateProfile,
         updatePassword,
         updateEmail,
         User,
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword, 
         signInWithPopup,
         GoogleAuthProvider, 
         signOut} from '@angular/fire/auth';
import { Firestore,
         getDoc,
         setDoc,
         updateDoc,
         doc,
         collection, 
         getDocs,
         increment,
         arrayUnion,
         docData} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { FunctionalitiesService } from './functionalities.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth:Auth = getAuth();
  provider = new GoogleAuthProvider();

  user:User|any
  userId: string | any;
  imageURL: string | any;

  signUpWithEmail(password:string, email:string, gender:string, name:string){
    const user = createUserWithEmailAndPassword(this.auth, email, password)
    .then((details)=>{
      console.log(details.user.uid)
      updateProfile(details.user, {
        displayName: name,
        photoURL: `https://avatars.dicebear.com/api/${gender}/big-ears/${name}.svg`
      })
      return details.user
    })
    .catch((err)=>{
      console.log(err)
    })

    return user
  }

  signInWithEmail(email:string, password:string){
    const user = signInWithEmailAndPassword(this.auth, email, password)
    .then((details)=>{
      return details.user
    })
    return user
  }

  signInWithGoogle(){
    const user = signInWithPopup(this.auth, this.provider)
    .then((details)=>{
      return details.user;
    })
    return user
  }

  signOut(){
    const user = signOut(this.auth)
    return user
  }

  setProfilePicture(currentUser:User, newUrl:string){
    updateProfile(currentUser, {
      photoURL: newUrl,
    })
    .then(() => {
      this.uiService.createToast("Profile Picture Changed!🎉")
    })
    .catch(() => {
      this.uiService.createToast("Could not change profile picture.😢")
    })
  }

  setDisplayName(currentUser:User, newName:string){
    updateProfile(currentUser, {
      displayName: newName
    })
    .then(() => {
      this.uiService.createToast("Display Name Changed!🎉")
    })
    .catch(() => {
      this.uiService.createToast("Could not change display name.😢")
    })
  }

  getAllUsersDocuments(collectionName:string){
    const ref = collection(this.firestore, collectionName);
    return getDocs(ref)
  }

  getUserDocument(collectionName:string, userId:string){
    const ref = doc(this.firestore, `${collectionName}/${userId}`);
    return docData(ref)
  }

  createUserDocument(collectionName:string, userId:string|any, data:any){
    const ref = doc(this.firestore, `${collectionName}/${userId}`);
    return setDoc(ref, data);
  }

  updateUserCarbonAmount(collectionName:string, userId:string, amount:number){
    const ref = doc(this.firestore, `${collectionName}/${userId}`)
    return updateDoc(ref, {
      "totalCarbonThisMonth.carbonAmount": increment(amount)
    })
  }

  updateUserCarbonBudget(collectionName:string, userId:string, amount:number){
    const ref = doc(this.firestore, `${collectionName}/${userId}`)
    return updateDoc(ref, {
      carbonBudgetForMonth: amount
    })
  }


  addNewMonthToCarbonHistory(collectionName:string, userId:string, data:any){
    const ref = doc(this.firestore, `${collectionName}/${userId}`)
    return updateDoc(ref, {
      carbonHistory: arrayUnion(data)
    })
  }

  async writeToFirebaseStorage(fileName: string, image:Photo|any){
    const storageRef = ref(this.storage, `profile-pics/${fileName}.png`);
    uploadString(storageRef,image.base64String,'base64')
    .catch(()=>{
      this.uiService.createToast("Could not upload file at this time.")
    })
  }

  async getURLFromStorage(fileName:string){
    const storageRef = ref(this.storage, `profile-pics/${fileName}.png`);
    const url = getDownloadURL(storageRef).then((downloadURL) =>{
      return downloadURL;
    })
    return url;
  }




  constructor(private firestore:Firestore,
              private storage:Storage,
              private uiService:FunctionalitiesService) {} 
}  
