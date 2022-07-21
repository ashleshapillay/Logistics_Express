import { TestBed } from '@angular/core/testing';

import { LoadConfirmationServiceService } from './load-confirmation-service.service';

describe('LoadConfirmationServiceService', () => {
  let service: LoadConfirmationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadConfirmationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
