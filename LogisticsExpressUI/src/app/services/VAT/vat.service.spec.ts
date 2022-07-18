import { TestBed } from '@angular/core/testing';

import { VATService } from './vat.service';

describe('VATService', () => {
  let service: VATService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VATService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
