import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildSeePage } from './child-see.page';

describe('ChildSeePage', () => {
  let component: ChildSeePage;
  let fixture: ComponentFixture<ChildSeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildSeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildSeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
