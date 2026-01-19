import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketEvent, FaceDetectedPayload } from 'src/app/models/socket-event.model';
import { EventStoreService } from 'src/app/services/event-store.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'app-history-timeline',
  templateUrl: './history-timeline.component.html',
  styleUrls: ['./history-timeline.component.scss']
})

export class HistoryTimelineComponent {
  events$: Observable<SocketEvent<FaceDetectedPayload>[]>;

  selectedIndex = 0;

  constructor(
    private eventStore: EventStoreService,
    private ui: UiStateService
  ) {
    this.events$ = this.eventStore.ofType<FaceDetectedPayload>('FACE_DETECTED');
    this.events$.subscribe(events => {
      console.log('snapshot exists?', events[0]?.snapshot);
    });
  }

  /** Click timeline */
  select(eventId: string, index: number) {
    this.selectedIndex = index;
    this.ui.setHistory();
    this.eventStore.setCursor(eventId);
  
    this.capture(eventId);
  }

  /** Slider scrub */
  scrub(index: number, events: SocketEvent<FaceDetectedPayload>[]) {
    const event = events[index];
    if (!event) return;
  
    this.selectedIndex = index;
    this.ui.setHistory();
    this.eventStore.setCursor(event.id);
  
    this.capture(event.id);
  }

  capture(eventId: string) {
    const img = document.querySelector('img') as HTMLImageElement;
    if (!img) return;
  
    this.eventStore.captureSnapshot(eventId, img);
  }  

  backToLive() {
    this.selectedIndex = 0;
    this.eventStore.clearCursor();
    this.ui.setLive();
  }

  export(eventId: string, events: SocketEvent[]) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
  
    // 1️⃣ Export JSON
    const jsonBlob = new Blob(
      [JSON.stringify(event, null, 2)],
      { type: 'application/json' }
    );
  
    this.download(
      jsonBlob,
      `event_${event.id}.json`
    );
  
    // 2️⃣ Export snapshot si présent
    if (event.snapshot) {
      const imageBlob = this.base64ToBlob(event.snapshot);
      this.download(
        imageBlob,
        `snapshot_${event.id}.png`
      );
    }
  }
  
  private download(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  private base64ToBlob(base64: string): Blob {
    const parts = base64.split(',');
    const byteString = atob(parts[1]);
    const mime = parts[0].match(/:(.*?);/)![1];
  
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], { type: mime });
  }
    
}


