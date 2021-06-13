import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,
  AngularFirestoreDocument  } from "angularfire2/firestore";
import { song } from "src/app/song.interface";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public fs:AngularFirestore) { }

  createSong(albumName: string,artistName: string,
    songDescription: string, songName: string):Promise<void>{ 
      const id=this.fs.createId();
     return this.fs.doc(`songList/${id}`).set({id,
      albumName,artistName,songDescription,songName}); 
  }  

  getSongList():AngularFirestoreCollection<song>{

   return this.fs.collection(`songList`)

  }

   getSongDetail(songId:string):AngularFirestoreDocument<song>{

     return this.fs.collection(`songList`).doc(songId);
   }

   deleteSong(songId):Promise<void>{
    return this.fs.doc(`songList/${songId}`).delete();
   }

}


