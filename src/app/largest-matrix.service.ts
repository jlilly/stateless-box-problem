import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LargestMatrixService {

  constructor() { }

  public largestMatrix(arr: number[][]): number {
    const maxPossibleLength = this.sum(arr);
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
