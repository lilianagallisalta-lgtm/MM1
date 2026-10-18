import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildStagePage } from './child-stage.page';

describe('ChildStagePage', () => {
  let component: ChildStagePage;
  let fixture: ComponentFixture<ChildStagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildStagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildStagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
