import { TestBed } from '@angular/core/testing';

import { DeliverynoteService } from './deliverynote.service';

describe('DeliverynoteService', () => {
  let service: DeliverynoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverynoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
