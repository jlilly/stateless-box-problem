import { LargestMatrixService } from './largest-matrix.service';

describe('LargestMatrixService', () => {
  let service: LargestMatrixService;

  beforeEach(() => {
    service = new LargestMatrixService();
  });

  [{
    description: 'Simplest case, 0',
    arr: [[0]],
    expectedResult: 0
  }, {
    description: 'One case, 1',
    arr: [[1]],
    expectedResult: 1
  }, {
    description: '1 + 1 + 1 + 1 + 1 = 5',
    arr: [[1, 0, 1],
          [0, 0, 0],
          [1, 1, 1]],
    expectedResult: 5
  }, {
    description: 'Can handle all numbers',
    arr: [[1, 0, -1],
          [0, 6, 0],
          [.5, 1, 1]],
    expectedResult: 8.5
  }].forEach( testCase => {
    it(testCase.description, () => {
      const result = (service as any).sum(testCase.arr);

      expect(result).toEqual(testCase.expectedResult);
    });
  });



});
