import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorcontactsComponent } from './subcontractorcontacts.component';

describe('SubcontractorcontactsComponent', () => {
  let component: SubcontractorcontactsComponent;
  let fixture: ComponentFixture<SubcontractorcontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorcontactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorcontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
