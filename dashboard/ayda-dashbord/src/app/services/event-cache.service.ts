import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventCacheService {
  private db!: IDBDatabase;

  async init() {
    const request = indexedDB.open('FaceEventsDB', 1);
    request.onupgradeneeded = e => {
      const db = (e.target as any).result;
      db.createObjectStore('events', { keyPath: 'id' });
    };
    this.db = await new Promise(res => request.onsuccess = () => res(request.result));
  }

  save(event: any) {
    const tx = this.db.transaction('events', 'readwrite');
    tx.objectStore('events').put(event);
  }

  async loadAll(): Promise<any[]> {
    const tx = this.db.transaction('events', 'readonly');
    const req = tx.objectStore('events').getAll();
    return new Promise(res => req.onsuccess = () => res(req.result));
  }
}
