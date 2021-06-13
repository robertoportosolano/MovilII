import { Component, OnInit } from '@angular/core';
import {EventService } from "src/app/services/event/event.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
   
  public currentEvent: any=[];
  public guestName='';
  constructor(public es:EventService, public ar:ActivatedRoute ) { }

  ngOnInit() {
    const eventId: string = this.ar.snapshot.paramMap.get('id');
    this.es.getEventDetail(eventId).then(eventSnapshot => {
      this.currentEvent = eventSnapshot.data();
      this.currentEvent.id = eventSnapshot.id;
      });
    }

    addGuest(guestName: string): void {
      this.es.addGuest( guestName,this.currentEvent.id, this.currentEvent.price, ).then(() => this.guestName = '' );
     }
 }
