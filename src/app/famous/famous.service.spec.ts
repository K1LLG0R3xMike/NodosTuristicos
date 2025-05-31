import { TestBed } from '@angular/core/testing';

import { FamousService } from './famous.service';

describe('FamousService', () => {
  let service: FamousService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
