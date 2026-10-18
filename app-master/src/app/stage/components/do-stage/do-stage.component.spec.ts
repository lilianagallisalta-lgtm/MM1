import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoStageComponent } from './do-stage.component';

describe('DoStageComponent', () => {
  let component: DoStageComponent;
  let fixture: ComponentFixture<DoStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
