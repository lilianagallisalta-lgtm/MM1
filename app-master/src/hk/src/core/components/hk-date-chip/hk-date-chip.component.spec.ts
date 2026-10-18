import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkDateChipComponent } from './hk-date-chip.component';

describe('HkDateChipComponent', () => {
  let component: HkDateChipComponent;
  let fixture: ComponentFixture<HkDateChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkDateChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkDateChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
