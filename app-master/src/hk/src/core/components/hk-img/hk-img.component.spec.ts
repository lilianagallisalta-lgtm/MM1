import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkImgComponent } from './hk-img.component';

describe('HkImgComponent', () => {
  let component: HkImgComponent;
  let fixture: ComponentFixture<HkImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
