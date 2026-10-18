import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkDaterangepickerComponent } from './hk-daterangepicker.component';

describe('HkDaterangepickerComponent', () => {
  let component: HkDaterangepickerComponent;
  let fixture: ComponentFixture<HkDaterangepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkDaterangepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkDaterangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
