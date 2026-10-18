import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCreatePage } from './child-create.page';

describe('ChildCreatePage', () => {
  let component: ChildCreatePage;
  let fixture: ComponentFixture<ChildCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
