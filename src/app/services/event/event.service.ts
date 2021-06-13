import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  public eventListRef: firebase.firestore.CollectionReference;
  constructor( public as:AuthService) {   }

async createEvent(eventName:string, 
  eventDate:string,
  eventPrice:number,
  eventCost:number,
  ):Promise<firebase.firestore.DocumentReference>  {
       const user: firebase.User=await this.as.getUser();
       this.eventListRef= firebase.firestore().collection(`userProfile/${user.uid}/eventList`); 
       return  this.eventListRef.add({ 
  name: eventName, 
  date: eventDate,
  price: eventPrice * 1,
  cost: eventCost * 1,
  revenue: eventCost * -1,
});           
  }

  async getEventList():Promise<firebase.firestore.QuerySnapshot>{
   const user: firebase.User= this.as.getUser();
   this.eventListRef= firebase.firestore().collection(`userProfile/${user.uid}/eventList`);
   return this.eventListRef.get();
   }

   async getEventDetail(eventId: string):Promise<firebase.firestore.DocumentSnapshot>{
    const user: firebase.User= this.as.getUser();
     this.eventListRef= firebase.firestore().collection(`userProfile/${user.uid}/eventList`);
     return this.eventListRef.doc(eventId).get();
    }

  async addGuest(guestName:string, eventId:string, eventPrice:number):Promise<void>{
    return this.eventListRef.doc(eventId)
    .collection('guestList')
    .add({guestName})
    .then((newGuest)=>{
      return firebase.firestore().runTransaction(transaction=> { 
         
        return transaction.get(this.eventListRef.doc(eventId)).then(eventDoc=>{
         const newRevenue = eventDoc.data().revenue + eventPrice;

           transaction.update(this.eventListRef.doc(eventId), {revenue: newRevenue
          }); 
          });
          });
          });
        }

}
