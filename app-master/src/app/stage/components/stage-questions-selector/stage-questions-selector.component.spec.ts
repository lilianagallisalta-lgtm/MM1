import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageQuestionsSelectorComponent } from './stage-questions-selector.component';

describe('StageQuestionsSelectorComponent', () => {
  let component: StageQuestionsSelectorComponent;
  let fixture: ComponentFixture<StageQuestionsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageQuestionsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageQuestionsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
