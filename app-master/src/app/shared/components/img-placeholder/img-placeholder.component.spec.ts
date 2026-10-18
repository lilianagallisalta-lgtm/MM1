import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPlaceholderComponent } from './img-placeholder.component';

describe('ImgPlaceholderComponent', () => {
  let component: ImgPlaceholderComponent;
  let fixture: ComponentFixture<ImgPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
