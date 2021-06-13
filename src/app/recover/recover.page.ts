import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FormGroup,FormBuilder,Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";



@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
   recoverForm: FormGroup;
  constructor(public fb:FormBuilder, public as:AuthService,
    public router:Router, public ac:AlertController) {
       this.buildForm();
      }
    
  ngOnInit() {
  }
   resetPassword(event: Event):void {
    event.preventDefault(); 
    if (this.recoverForm.valid) {
       const value = this.recoverForm.value;
       this.as.recoverPassword(value.email).then(
       async ()=> {
         const alert =await this.ac.create({
           message:
           "Revisa tu correo por que te enviamos un enlace para que cambies tu contraseña"
            , buttons:[{ text:'ok', role:'cancel',handler:()=> 
            {this.router.navigateByUrl('login');},
          },],
          });
          await alert.present(); 
        }, 
         async error=>{ const ErrorAlert=await this.ac.create({
           message: error.message, buttons: [{text:'OK', role:'cancel' }], 
         });
          await ErrorAlert.present();
        }         
       );
    } 
   }

   private buildForm() {
    this.recoverForm=this.fb.group({
     email:['',[Validators.required, Validators.email] ]
    });
  }

  get emailField(){ return this.recoverForm.get('email');}


}
