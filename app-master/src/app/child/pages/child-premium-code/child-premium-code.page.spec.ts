import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPremiumCodePage } from './child-premium-code.page';

describe('ChildPremiumCodePage', () => {
  let component: ChildPremiumCodePage;
  let fixture: ComponentFixture<ChildPremiumCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildPremiumCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildPremiumCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
