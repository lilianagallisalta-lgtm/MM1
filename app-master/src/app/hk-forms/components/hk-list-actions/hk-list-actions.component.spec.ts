import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkListActionsComponent } from './hk-list-actions.component';

describe('HkListActionsComponent', () => {
  let component: HkListActionsComponent;
  let fixture: ComponentFixture<HkListActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkListActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
