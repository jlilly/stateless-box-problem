import { LargestMatrixService } from './largest-matrix.service';

describe('LargestMatrixService', () => {
  let service: LargestMatrixService;

  beforeEach(() => {
    service = new LargestMatrixService();
  });

  describe('sum()', () => {
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

  describe('analyseRow()', () => {
    [{
      description: 'Zero Case',
      row: [0, 0, 0],
      expectedResult: []
    }, {
      description: 'One Case',
      row: [1, 0, 0],
      expectedResult: [{index: 0, length: 1}]
    }, {
      description: 'Two Case',
      row: [1, 1, 0],
      expectedResult: [{index: 0, length: 2}]
    }, {
      description: 'Double One Case',
      row: [1, 0, 1],
      expectedResult: [{index: 0, length: 1}, {index: 2, length: 1}]
    }, {
      description: 'Two at the end',
      row: [0, 1, 1],
      expectedResult: [{index: 1, length: 2}]
    }].forEach( testCase => {
      it(testCase.description, () => {
        const result = (service as any).analyseRow(testCase.row);

        expect(result).toEqual(testCase.expectedResult);
      });
    });
  });

  // TODO: this may become a large set of tests, move into own file?
  describe('largestMatrix()', () => {
    [{
      description: 'Gracefully handles bad input: undefined',
      arr: undefined,
      expectedResult: 0
    }, {
      description: 'Gracefully handles bad input: null',
      arr: null,
      expectedResult: 0
    }, {
      description: 'Gracefully handles bad input: []',
      arr: [],
      expectedResult: 0
    }, {
      description: 'Gracefully handles bad input: [[]]',
      arr: [[]],
      expectedResult: 0
    }, {
      description: 'Zero Case',
      arr: [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]],
      expectedResult: 0
    }, {
      description: 'One Case',
      arr: [[0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]],
      expectedResult: 1
    }, {
      description: 'Two Case',
      arr: [[1, 0, 0],
            [0, 1, 0],
            [0, 0, 0]],
      expectedResult: 1
    }, {
      description: 'Three Case',
      arr: [[1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]],
      expectedResult: 1
    }, {
      description: 'Four doesn\'t mean a square',
      arr: [[1, 0, 0],
            [0, 1, 0],
            [1, 0, 1]],
      expectedResult: 1
    }, {
      description: 'Easy square',
      arr: [[0, 0, 0],
            [0, 1, 1],
            [0, 1, 1]],
      expectedResult: 2
    }, {
      description: 'Slightly more difficult square',
      arr: [[1, 0, 1],
            [0, 1, 1],
            [1, 1, 1]],
      expectedResult: 2
    }, {
      description: 'input001',
      arr: [[1, 1, 1],
            [1, 1, 0],
            [1, 0, 1]],
      expectedResult: 2
    }, {
      description: 'input002',
      arr: [[0, 1, 1],
            [1, 1, 0],
            [1, 0, 1]],
      expectedResult: 1
    }, {
      description: 'Canonical HR case',
      arr: [[1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1]],
      expectedResult: 3
    }, {
      description: 'Modified HR case',
      arr: [[1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1]],
      expectedResult: 3
    }, {
      description: 'Whoa man',
      arr: [[1, 0, 1, 0, 1],
            [0, 1, 1, 1, 1],
            [0, 0, 1, 1, 0],
            [1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1]],
      expectedResult: 2
    }, {
      description: 'Wazup man',
      arr: [[1, 0, 1, 0, 1],
            [0, 1, 1, 1, 1],
            [0, 0, 1, 1, 0],
            [1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1]],
      expectedResult: 2
    }, {
      description: 'Overhangs',
      arr: [[0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]],
      expectedResult: 3
    }, {
      description: 'Overhangs other way',
      arr: [[0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]],
      expectedResult: 3
    }, {
      description: 'No overlap',
      arr: [[0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0]],
      expectedResult: 1
    }, {
      description: 'Twos trouble',
      arr: [[1, 1, 0, 1, 1],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]],
      expectedResult: 2
    }, {
      description: 'Sideways h',
      arr: [[0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0]],
      expectedResult: 2
    }, {
      description: 'Not square, not fair',
      arr: [[1, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 1, 1, 1]],
      expectedResult: 3
    }, {
      description: 'Not square, less fair',
      arr: [[1, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [0, 0, 0, 0, 1, 0, 1]],
      expectedResult: 3
    }, {
      description: 'Lucky 7',
      arr: [[1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]],
     expectedResult: 7
    }].forEach( testCase => {
      it(testCase.description, () => {
        const result = service.largestMatrix(testCase.arr);

        expect(result).toEqual(testCase.expectedResult);
      });
    });
  });
});
