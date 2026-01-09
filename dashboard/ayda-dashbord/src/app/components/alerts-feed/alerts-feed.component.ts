import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-alerts-feed',
  templateUrl: './alerts-feed.component.html',
  styleUrls: ['./alerts-feed.component.scss']
})
export class AlertsFeedComponent implements OnInit {
  alerts: any[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    
    this.socketService.onFaceDetected().subscribe((event) => {
      console.log('Event reçu:', event);
      this.alerts.push(event);
    });
  }
}
