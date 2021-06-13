import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase  from "firebase/app";
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
constructor(public f:AngularFireAuth) { }

getUser()   {
  return this.f.auth.currentUser;
} 

loginUser(email:string, password:string):Promise<firebase.auth.UserCredential>
{
  return this.f.auth.signInWithEmailAndPassword(email,password);
}

signupUser(email:string, password:string):Promise<any>{
   return this.f.auth.createUserWithEmailAndPassword(email,password);
}

recoverPassword(email:string):Promise<void>{
 return this.f.auth.sendPasswordResetEmail(email);
}

logoutUser():Promise<void>{
  return this.f.auth.signOut();
}
hasUser() {
  return this.f.authState;
}

}