import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildHistoryPage } from './child-history.page';

describe('ChildHistoryPage', () => {
  let component: ChildHistoryPage;
  let fixture: ComponentFixture<ChildHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
