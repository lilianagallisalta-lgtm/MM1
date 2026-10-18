import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkEmptyComponent } from './hk-empty.component';

describe('HkEmptyComponent', () => {
  let component: HkEmptyComponent;
  let fixture: ComponentFixture<HkEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
