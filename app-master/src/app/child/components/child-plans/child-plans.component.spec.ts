import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPlansComponent } from './child-plans.component';

describe('ChildPlansComponent', () => {
  let component: ChildPlansComponent;
  let fixture: ComponentFixture<ChildPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
