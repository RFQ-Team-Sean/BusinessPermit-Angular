import { TestBed } from '@angular/core/testing';

import { PermitApplicationService } from './permit-application.service';

describe('PermitApplicationService', () => {
  let service: PermitApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermitApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
