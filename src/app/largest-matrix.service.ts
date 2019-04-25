import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

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




    return 0;
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

  // TODO: type output
  // create list of strings of 1s in each row
  private analyseRow(arr: number[][]): any[] {
    return [];
  }
}
