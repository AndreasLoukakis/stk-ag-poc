import { TestBed } from '@angular/core/testing';

import { StkPaginationService } from './stk-pagination.service';

describe('StkPaginationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StkPaginationService = TestBed.get(StkPaginationService);
    expect(service).toBeTruthy();
  });
});
