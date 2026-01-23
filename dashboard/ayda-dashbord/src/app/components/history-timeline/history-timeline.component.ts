import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketEvent, FaceDetectedPayload } from 'src/app/models/socket-event.model';
import { EventStoreService } from 'src/app/services/event-store.service';
import { MiniPlayerService } from 'src/app/services/mini-player.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'app-history-timeline',
  templateUrl: './history-timeline.component.html',
  styleUrls: ['./history-timeline.component.scss']
})

export class HistoryTimelineComponent {
  events$: Observable<SocketEvent<FaceDetectedPayload>[]>;
  isPlaying = false;

  selectedIndex = 0;
  previewIndex: number | null = null; // 👁 preview temporaire

  constructor(
    private eventStore: EventStoreService,
    private ui: UiStateService,
    private player: MiniPlayerService
  ) {
    this.events$ = this.eventStore.ofType<FaceDetectedPayload>('FACE_DETECTED');
    this.events$.subscribe(events => {
      console.log('snapshot exists?', events[0]?.snapshot);
      this.selectedIndex = events.length - 1;
    });
  }

  /** Click timeline */
  select(eventId: string, index: number) {
    this.selectedIndex = index;
    this.previewIndex = null;
    this.ui.setHistory();
    this.eventStore.setCursor(eventId);
  
    this.capture(eventId);
  }

  preview(event: SocketEvent<FaceDetectedPayload>) {
    if (event.snapshot) return; // déjà prêt 👌
  
    // ⚠️ capture VISUELLE uniquement depuis le flux courant
    const img = document.querySelector('img') as HTMLImageElement;
    if (!img) return;
  
    this.eventStore.captureSnapshot(event.id, img);
  }  

  /** Click timeline */
  mouseEnter(event: SocketEvent<FaceDetectedPayload>, index: number) {
    if (this.isPlaying) return;
    this.previewIndex = index;
    this.preview(event); // 👁 prépare la snapshot si absente
  }  

  /** Click timeline */
  mouseLeave(eventId: string, index: number) {
    this.previewIndex = null;
  }

  /** Slider scrub */
  scrub(index: number, events: SocketEvent<FaceDetectedPayload>[]) {
    if (this.isPlaying) return;
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

  exportAudit(eventId: string, events: SocketEvent[]) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
  
    // 🧾 Audit Trail final
    const auditExport = {
      meta: {
        exportedAt: new Date().toISOString(),
        exporter: 'AYDA Dashboard',
        format: 'audit-v1'
      },
      event: {
        id: event.id,
        type: event.type,
        timestamp: event.timestamp,
        payload: event.payload ?? null
      },
      snapshot: event.snapshot ? 'included' : 'none',
      audit: event.audit ?? null
    };
  
    // 📄 Export JSON
    const jsonBlob = new Blob(
      [JSON.stringify(auditExport, null, 2)],
      { type: 'application/json' }
    );
  
    this.download(
      jsonBlob,
      `audit_${event.id}.json`
    );
  
    // 🖼 Export snapshot si présent
    if (event.snapshot) {
      const imageBlob = this.base64ToBlob(event.snapshot);
      this.download(
        imageBlob,
        `audit_${event.id}.png`
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

  replay(events: SocketEvent<FaceDetectedPayload>[]) {
    if (!events?.length) return;
  
    let i = events.length - 1;
  
    const interval = setInterval(() => {
      if (i < 0) {
        clearInterval(interval);
        return;
      }
  
      const e = events[i];
      this.ui.setHistory();
      this.eventStore.setCursor(e.id);
      this.selectedIndex = i; // pour mettre à jour la preview
      i--;
    }, 500); // 500ms/frame
  }
  

  play(events: SocketEvent<FaceDetectedPayload>[]) {
    this.isPlaying = true;
    this.player.play(events, 2, (event, index) => {
      this.selectedIndex = index;
      this.preview(event);
    });
  }
  

  stop() {
    this.isPlaying = false;
    this.player.stop();
  }

  get activeIndex() {
    console.log(this.previewIndex)
    return this.isPlaying
    ? this.selectedIndex
    : (this.previewIndex ?? this.selectedIndex);
  } 
    
}

