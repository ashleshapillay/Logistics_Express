import { TestBed } from '@angular/core/testing';

import { MobileServicesService } from './mobile-services.service';

describe('MobileServicesService', () => {
  let service: MobileServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
