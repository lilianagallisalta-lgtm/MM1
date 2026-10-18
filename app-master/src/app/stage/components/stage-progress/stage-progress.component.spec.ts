import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageProgressComponent } from './stage-progress.component';

describe('StageProgressComponent', () => {
  let component: StageProgressComponent;
  let fixture: ComponentFixture<StageProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
