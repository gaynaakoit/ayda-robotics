import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsFeedComponent } from './alerts-feed.component';

describe('AlertsFeed', () => {
  let component: AlertsFeedComponent;
  let fixture: ComponentFixture<AlertsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsFeedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
