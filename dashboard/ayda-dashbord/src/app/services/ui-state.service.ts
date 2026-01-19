import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  private mode$ = new BehaviorSubject<'LIVE' | 'HISTORY'>('LIVE');

  setLive() {
    this.mode$.next('LIVE');
  }

  setHistory() {
    this.mode$.next('HISTORY');
  }

  mode() {
    return this.mode$.asObservable();
  }

  isLive() {
    return this.mode$.pipe(map(m => m === 'LIVE'));
  }

  isHistory() {
    return this.mode$.pipe(map(m => m === 'HISTORY'));
  }
}

