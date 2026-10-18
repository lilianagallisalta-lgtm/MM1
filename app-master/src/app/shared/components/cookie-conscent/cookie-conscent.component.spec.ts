import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieConscentComponent } from './cookie-conscent.component';

describe('CookieConscentComponent', () => {
  let component: CookieConscentComponent;
  let fixture: ComponentFixture<CookieConscentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieConscentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieConscentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
