import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkHelpCardComponent } from './hk-help-card.component';

describe('HkHelpCardComponent', () => {
  let component: HkHelpCardComponent;
  let fixture: ComponentFixture<HkHelpCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkHelpCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkHelpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
