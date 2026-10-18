import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkLoadingComponent } from './hk-loading.component';

describe('LoadingComponent', () => {
  let component: HkLoadingComponent;
  let fixture: ComponentFixture<HkLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
