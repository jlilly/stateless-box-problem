import { Matrix } from './matrix';

describe('Matrix: A Model', () => {
  let matrix: Matrix;

  beforeEach(() => {
    matrix = new Matrix();
  });

  it('creates', () => {
      expect(matrix).toBeTruthy();
  });

  describe('isEmpty()', () => {
    [{
      description: 'undefined',
      arr: undefined,
      expectedResult: true
    }, {
      description: 'null',
      arr: null,
      expectedResult: true
    }, {
      description: 'Single array',
      arr: [],
      expectedResult: true
    }, {
      description: 'Empty Double array',
      arr: [[]],
      expectedResult: true
    }].forEach( testCase => {
      it(testCase.description, () => {
        const result = (matrix as any).isEmpty(testCase.arr);

        expect(result).toEqual(testCase.expectedResult);
      });
    });
  });

  const setTests = [{
    description: 'Changed',
    arr: [[{checked: false}]],
    expectedResult: [[{checked: false}]]
  }];

  describe('set ngModelData', () => {
    beforeEach(() => {
      (matrix as any).data = [[{checked: true}]];
    });

    setTests.forEach( testCase => {
      it(testCase.description, () => {
        matrix.ngModelData = testCase.arr;

        expect(matrix.ngModelData).toEqual(testCase.expectedResult);
      });
    });
  });

  const setArrTests = setTests.map( t => {
    const newArr = t.arr.map(
      row => row.map( col => col.checked ? 1 : 0 )
    );
    return { ...t, arr: newArr };
  });

  describe('set arr', () => {
    beforeEach(() => {
      (matrix as any).data = [[{checked: true}]];
    });

    setArrTests.forEach( testCase => {
      it( testCase.description, () => {
        matrix.arr = testCase.arr;

        expect(matrix.ngModelData).toEqual(testCase.expectedResult);
      });
    });
  });

  describe ('get arr', () => {
    [{
      description: 'Empty',
      arr: [[]],
      expectedResult: [[]]
    }, {
      description: 'Easy',
      arr: [[{checked: false}]],
      expectedResult: [[0]]
    }, {
      description: 'Square',
      arr: [[{checked: false}, {checked: true}],
            [{checked: true}, {checked: false}]],
      expectedResult: [[0, 1],
                       [1, 0]]
    }].forEach( testCase => {
      it( testCase.description, () => {
        (matrix as any).data = testCase.arr;

        expect(matrix.arr).toEqual(testCase.expectedResult);
      });
    });
  });

  describe('height', () => {
    const heightTests = [{
      description: '1',
      height: 1,
      arr: [[{checked: true}, {checked: true}]]
    }, {
      description: '2',
      height: 2,
      arr: [[{checked: true}, {checked: true}],
            [{checked: true}, {checked: true}]]
    }, {
      description: '3',
      height: 3,
      arr: [[{checked: true}, {checked: true}],
            [{checked: true}, {checked: true}],
            [{checked: false}, {checked: false}]]
    }];

    const negTest = [{
      description: '0',
      height: 0,
      arr: [[]]
    }, {
      description: '-1',
      height: -1,
      arr: [[{checked: true}, {checked: true}],
            [{checked: true}, {checked: true}]]
    }];

    describe('set()', () => {
      beforeEach(() => {
        (matrix as any).data = [
          [{checked: true}, {checked: true}],
          [{checked: true}, {checked: true}]
        ];
      });

      [...heightTests, ...negTest].forEach( testCase => {
        it(testCase.description, () => {
          matrix.height = testCase.height;

          expect(matrix.ngModelData).toEqual(testCase.arr);
        });
      });
    });

    describe('get()', () => {
      heightTests.forEach( testCase => {
        it(testCase.description, () => {
          (matrix as any).data = testCase.arr;

          expect(matrix.height).toEqual(testCase.height);
        });
      });
    });
  });

  describe('length', () => {
    const lengthTests = [{
      description: '1',
      length: 1,
      arr: [[{checked: true}],
            [{checked: true}]]
    }, {
      description: '2',
      length: 2,
      arr: [[{checked: true}, {checked: true}],
            [{checked: true}, {checked: true}]]
    }, {
      description: '3',
      length: 3,
      arr: [[{checked: true}, {checked: true}, {checked: false}],
            [{checked: true}, {checked: true}, {checked: false}]]
    }];

    const negTest = [{
      description: '0',
      length: 0,
      arr: [[]]
    }, {
      description: '-1',
      length: -1,
      arr: [[{checked: true}, {checked: true}],
            [{checked: true}, {checked: true}]]
    }];

    describe('set()', () => {
      beforeEach(() => {
        (matrix as any).data = [
          [{checked: true}, {checked: true}],
          [{checked: true}, {checked: true}]
        ];
      });

      [...lengthTests, ...negTest].forEach( testCase => {
        it(testCase.description, () => {
          matrix.length = testCase.length;

          expect(matrix.ngModelData).toEqual(testCase.arr);
        });
      });
    });

    describe('get()', () => {
      lengthTests.forEach( testCase => {
        it(testCase.description, () => {
          (matrix as any).data = testCase.arr;

          expect(matrix.length).toEqual(testCase.length);
        });
      });
    });
  });

});
