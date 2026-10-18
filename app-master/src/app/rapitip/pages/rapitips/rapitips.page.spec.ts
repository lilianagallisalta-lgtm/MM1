import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapitipsPage } from './rapitips.page';

describe('RapitipsPage', () => {
  let component: RapitipsPage;
  let fixture: ComponentFixture<RapitipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapitipsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapitipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
