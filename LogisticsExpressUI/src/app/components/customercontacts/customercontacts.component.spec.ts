import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercontactsComponent } from './customercontacts.component';

describe('CustomercontactsComponent', () => {
  let component: CustomercontactsComponent;
  let fixture: ComponentFixture<CustomercontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomercontactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
