import { TestBed } from '@angular/core/testing';

import { SubcontractorcontactsService } from './subcontractorcontacts.service';

describe('SubcontractorcontactsService', () => {
  let service: SubcontractorcontactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcontractorcontactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
