import { TestBed } from '@angular/core/testing';

import { RandomFactService } from './random-fact.service';

describe('RandomFactService', () => {
  let service: RandomFactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomFactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
