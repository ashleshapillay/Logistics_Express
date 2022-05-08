import { TestBed } from '@angular/core/testing';

import { CustomercontactsService } from './customercontacts.service';

describe('CustomercontactsService', () => {
  let service: CustomercontactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomercontactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
