import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultGaugeComponent } from './result-gauge.component';

describe('ResultGaugeComponent', () => {
  let component: ResultGaugeComponent;
  let fixture: ComponentFixture<ResultGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
