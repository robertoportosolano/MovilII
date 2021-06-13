import { Component } from '@angular/core';
import { song } from "src/app/song.interface";
import { FirestoreService } from "src/app/services/data/firestore.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  songList:any=[]; 
  constructor( public fs:FirestoreService,public r:Router) {}

  
  ngOnInit(){
    this.songList=this.fs.getSongList().valueChanges();
   }


}
