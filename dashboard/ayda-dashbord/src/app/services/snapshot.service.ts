import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SnapshotService {

  captureFromImage(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL('image/jpeg', 0.9);
  }
}
