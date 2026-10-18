import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutMercadopagoComponent } from './checkout-mercadopago.component';

describe('CheckoutMercadopagoComponent', () => {
  let component: CheckoutMercadopagoComponent;
  let fixture: ComponentFixture<CheckoutMercadopagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutMercadopagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutMercadopagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
