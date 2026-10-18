import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaResultsPage } from './area-results.page';

describe('AreaResultsPage', () => {
  let component: AreaResultsPage;
  let fixture: ComponentFixture<AreaResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
