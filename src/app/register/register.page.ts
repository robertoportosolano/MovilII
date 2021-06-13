import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormGroup,FormBuilder,Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup; 
  constructor(public fb:FormBuilder, public as:AuthService,
     public router:Router, public ac:AlertController) {
        this.buildForm();
       }

  ngOnInit() {
  }
  async signupUser(event: Event):Promise<void>{
    event.preventDefault();  
  if (this.registerForm.valid) {
       const value = this.registerForm.value;
       this.as.signupUser(value.email, value.password).then(()=>{
         this.router.navigateByUrl('login');
       }, async error=>{
         const alert =await this.ac.create({
            message:error.message, buttons: [{text:'Ok', role: 'cancel'}],
         });
         await alert.present();
       } 
       );
    } 
  }  
   
  private buildForm() {
    this.registerForm=this.fb.group({
     email:['',[Validators.required, Validators.email] ],
     password:['',[Validators.required, Validators.minLength] ]
    });
  }

  get emailField(){ return this.registerForm.get('email');}
  get passField(){ return this.registerForm.get('password');}  

}
