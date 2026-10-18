import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkMutationDirective } from './hk-mutation.directive';

describe('HkMutationDirective', () => {
  let component: HkMutationDirective;
  let fixture: ComponentFixture<HkMutationDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkMutationDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkMutationDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
