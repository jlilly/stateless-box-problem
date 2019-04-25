import { TestBed } from '@angular/core/testing';

import { LargestMatrixService } from './largest-matrix.service';

describe('LargestMatrixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LargestMatrixService = TestBed.get(LargestMatrixService);
    expect(service).toBeTruthy();
  });
});
