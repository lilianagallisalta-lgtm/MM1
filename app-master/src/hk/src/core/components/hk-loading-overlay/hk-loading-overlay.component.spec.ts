import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkLoadingOverlayComponent } from './hk-loading-overlay.component';

describe('LoadingOverlayComponent', () => {
  let component: HkLoadingOverlayComponent;
  let fixture: ComponentFixture<HkLoadingOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkLoadingOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkLoadingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
