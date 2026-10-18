import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapitipPage } from './rapitip.page';

describe('RapitipPage', () => {
  let component: RapitipPage;
  let fixture: ComponentFixture<RapitipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapitipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapitipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
