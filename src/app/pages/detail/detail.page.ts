import { Component, OnInit } from '@angular/core';
import { FirestoreService } from "src/app/services/data/firestore.service";
import { AlertController } from "@ionic/angular";
import {ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  song:any={};
  songId:any;
  constructor(
     public fs:FirestoreService,
     public ac:AlertController,
     public r:Router,
     public aroute:ActivatedRoute) { }
  
  ngOnInit() {
   this.songId=this.aroute.snapshot.paramMap.get('id');
   this.song=this.fs.getSongDetail(this.songId).valueChanges();  
   }

  async deleteSong(){
   const alert =await this.ac.create(
     {message: 'tu quieres eliminar esta canción?', buttons:[
       {text:'Cancelar', role:'cancel',
        handler:blah=> {
        console.log('Comfirmar cancelación: blah');
       },
      },{
        text:'Okay', 
        handler: ()=> {
        this.fs.deleteSong(this.songId).then(()=>{
         this.r.navigateByUrl('');
        });
      }, },      
     ], }); 
     await alert.present();
  }
}
