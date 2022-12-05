import { TestBed } from '@angular/core/testing';

import { ErrorModalServiceService } from './error-modal.service';

describe('ErrorModalServiceService', () => {
  let service: ErrorModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
