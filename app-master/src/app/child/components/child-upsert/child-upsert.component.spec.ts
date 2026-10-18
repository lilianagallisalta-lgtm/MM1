import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildUpsertComponent } from './child-upsert.component';

describe('ChildUpsertComponent', () => {
  let component: ChildUpsertComponent;
  let fixture: ComponentFixture<ChildUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
