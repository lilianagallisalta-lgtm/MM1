import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkChipComponent } from './hk-chip.component';

describe('HkChipComponent', () => {
  let component: HkChipComponent;
  let fixture: ComponentFixture<HkChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
