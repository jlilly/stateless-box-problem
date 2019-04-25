import { Injectable } from '@angular/core';
import { isNullOrUndefined, isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LargestMatrixService {

  constructor() { }

  public largestMatrix(arr: number[][]): number {
    if ( isNullOrUndefined(arr) ||  arr.length === 0 ) {
      return 0;
    }
    if ( arr[0].length === 0 ) {
      return 0;
    }

    const maxPossibleLength = Math.floor( Math.sqrt( this.sum(arr) ) );

    if ( maxPossibleLength < 2 ) {
      return maxPossibleLength;
    }

    const chains = arr.map( this.analyseRow );

    return 1;
  }

  /** Sum up all the 1s.
   * Useful for finding maximum possible square.
   */
  private sum(arr: number[][]): number {
    return arr.map(
      row => {
        return row.reduce( (prev, curr) => prev + curr );
      }).reduce( (prev, curr) => prev + curr );
  }

  // create list of strings of 1s in each row
  private analyseRow(row: number[]): { index: number, length: number }[] {
    const chainData = [];
    let start = 0;
    let len = 0;
    for ( let i = 0; i < row.length; ++i ) {
      if ( row[i] === 0 ) {
        if ( len > 0 ) {
          chainData.push({ index: start, length: len });
        }
        start = null;
        len = 0;
        continue;
      }

      if ( isNull(start) ) {
        start = i;
      }
      len++;
    }

    if ( !isNull(start) ) {
      chainData.push({ index: start, length: len });
    }

    return chainData;
  }
}
