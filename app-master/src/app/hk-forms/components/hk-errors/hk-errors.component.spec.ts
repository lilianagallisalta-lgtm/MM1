import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkErrorsComponent } from './hk-errors.component';

describe('HkErrorsComponent', () => {
  let component: HkErrorsComponent;
  let fixture: ComponentFixture<HkErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
