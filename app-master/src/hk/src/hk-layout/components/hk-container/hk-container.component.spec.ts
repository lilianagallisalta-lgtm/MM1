import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkContainerComponent } from './hk-container.component';

describe('HkContainerComponent', () => {
  let component: HkContainerComponent;
  let fixture: ComponentFixture<HkContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
