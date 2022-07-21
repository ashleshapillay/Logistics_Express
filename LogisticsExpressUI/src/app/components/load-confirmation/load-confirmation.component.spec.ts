import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadConfirmationComponent } from './load-confirmation.component';

describe('LoadConfirmationComponent', () => {
  let component: LoadConfirmationComponent;
  let fixture: ComponentFixture<LoadConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
