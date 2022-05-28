import { TestBed } from '@angular/core/testing';

import { VehicleSpecsService } from './vehicle-specs.service';

describe('VehicleSpecsService', () => {
  let service: VehicleSpecsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleSpecsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
