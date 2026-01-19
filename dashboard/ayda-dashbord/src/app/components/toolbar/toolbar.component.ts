import { Component, OnInit } from '@angular/core';
import { EventStoreService } from 'src/app/services/event-store.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private ui: UiStateService, private eventStore: EventStoreService) {}

  live() {
    this.ui.setLive();
    this.eventStore.clearCursor();
  }

  history() {
    this.ui.setHistory();
    this.eventStore.clearCursor();

  }

  ngOnInit(): void {
  }

}
