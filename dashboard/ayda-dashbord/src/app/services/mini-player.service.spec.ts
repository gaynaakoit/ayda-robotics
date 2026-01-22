import { TestBed } from '@angular/core/testing';

import { MiniPlayerService } from './mini-player.service';

describe('MiniPlayerService', () => {
  let service: MiniPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
