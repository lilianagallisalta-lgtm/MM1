import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPlanPage } from './child-plan.page';

describe('ChildPlanPage', () => {
  let component: ChildPlanPage;
  let fixture: ComponentFixture<ChildPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
