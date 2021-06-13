import { Component, OnInit } from '@angular/core';
import { EventService } from "src/app/services/event/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  
  eventList: any =[];
  constructor(public es:EventService) { }

  ngOnInit() {
    this.es.getEventList().then(eventListSnapshot => {
      this.eventList = []; eventListSnapshot.forEach(snap => {
        this.eventList.push({id: snap.id, 
            name: snap.data().name,
           price: snap.data().price,
            date: snap.data().date});
        return false;
      });
    });
  }

}
