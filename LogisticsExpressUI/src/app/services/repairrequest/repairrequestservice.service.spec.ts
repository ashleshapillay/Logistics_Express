import { TestBed } from '@angular/core/testing';

import { RepairrequestserviceService } from './repairrequestservice.service';

describe('RepairrequestserviceService', () => {
  let service: RepairrequestserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairrequestserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
