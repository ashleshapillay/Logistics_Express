import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingQuotesComponent } from './outstanding-quotes.component';

describe('OutstandingQuotesComponent', () => {
  let component: OutstandingQuotesComponent;
  let fixture: ComponentFixture<OutstandingQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
