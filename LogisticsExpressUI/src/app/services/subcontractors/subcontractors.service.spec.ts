import { TestBed } from '@angular/core/testing';

import { SubcontractorsService } from './subcontractors.service';

describe('SubcontractorsService', () => {
  let service: SubcontractorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcontractorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
