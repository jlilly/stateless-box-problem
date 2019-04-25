import { Injectable } from '@angular/core';
import { isNullOrUndefined, isNull, isUndefined } from 'util';

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

    const chainsMaster = arr.map( this.analyseRow );

    for ( let largest = maxPossibleLength; largest > 1; --largest ) {
      const chains = chainsMaster.map( row => {
        return row.filter(c => c.length >= largest);
      });

      for ( let i = 0; i < chains.length - largest + 1; ++i ) {
        for ( const chain of chains[i] ) {
          let count = 1;
          let leftBound = chain.index;

          for ( let o = i + 1; o < chains.length; ++o ) {
            const link = chains[o].find(
              c => c.length >= largest
              && c.index <= leftBound + largest + 1
              && c.index + c.length >= leftBound + largest
            );

            if ( isUndefined(link) ) {
              break;
            }

            if ( link.index > chain.index ) {
              leftBound = link.index;
            }

            count++;
          }

          if ( count === largest ) {
            return largest;
          }
        }
      }
    }

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
