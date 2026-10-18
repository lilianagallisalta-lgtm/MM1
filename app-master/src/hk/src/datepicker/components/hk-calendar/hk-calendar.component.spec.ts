import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkCalendarComponent } from './hk-calendar.component';

describe('HkCalendarComponent', () => {
  let component: HkCalendarComponent;
  let fixture: ComponentFixture<HkCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
