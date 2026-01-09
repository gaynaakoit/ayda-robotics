import { Component, OnInit } from '@angular/core';
import { LiveService } from '../../services/live.service';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss'],
})
export class LiveViewComponent implements OnInit {
  events: any[] = [];

  constructor(private liveService: LiveService) {}

  ngOnInit(): void {
    this.liveService.onEvent().subscribe((event: any) => {
      this.events.unshift(event);
    });
  }
}
