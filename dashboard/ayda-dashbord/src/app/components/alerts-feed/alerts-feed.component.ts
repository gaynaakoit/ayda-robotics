import { Component, OnInit } from '@angular/core';
import { SocketEvent } from 'src/app/models/socket-event.model';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-alerts-feed',
  templateUrl: './alerts-feed.component.html',
  styleUrls: ['./alerts-feed.component.scss']
})
export class AlertsFeedComponent implements OnInit {
  alerts: SocketEvent[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.listen<any>('events').subscribe((event) => {
      if (event.type === 'FACE_DETECTED') {
        console.log('Face detected:', event);
        this.alerts.push(event);
      } 
    });
  }
}
