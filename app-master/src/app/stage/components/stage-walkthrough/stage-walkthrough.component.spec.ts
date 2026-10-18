import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageWalkthroughComponent } from './stage-walkthrough.component';

describe('StageWalkthroughComponent', () => {
  let component: StageWalkthroughComponent;
  let fixture: ComponentFixture<StageWalkthroughComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageWalkthroughComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageWalkthroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
