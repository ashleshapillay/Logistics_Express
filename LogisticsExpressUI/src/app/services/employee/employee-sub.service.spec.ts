import { TestBed } from '@angular/core/testing';
import { EmployeeSubService } from './employee-sub.service';


describe('EmployeeSubService', () => {
  let service: EmployeeSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
