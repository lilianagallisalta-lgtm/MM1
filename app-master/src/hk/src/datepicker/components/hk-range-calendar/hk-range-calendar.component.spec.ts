import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkRangeCalendarComponent } from './hk-range-calendar.component';

describe('HkRangeCalendarComponent', () => {
  let component: HkRangeCalendarComponent;
  let fixture: ComponentFixture<HkRangeCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkRangeCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkRangeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
