import { Injectable } from '@angular/core';
import { isNullOrUndefined, isNull, isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LargestMatrixService {

  constructor() { }

  /**
   * Finds the largest square of 1s in an array of numbers.
   * Expanded upon original problem slightly by handling bad input.
   * @param arr A 2d array of 0s and 1s
   * @returns The side length for the largest square of 1s
   */
  public largestMatrix(arr: number[][]): number {
    // Since we're getting data from the Matrix, we can skip the method gaurds
    // Normally this would be in the model, but I'll leave it as a service

    // Start our search reasonably
    const maxPossibleLength = Math.floor( Math.sqrt( this.sum(arr) ) );

    if ( maxPossibleLength < 2 ) {
      // There are either NO squares or only groups of 1
      return maxPossibleLength;
    }

    // Bad name, but don't want to recalc the chain data over and over...
    const chainsMaster = arr.map( this.analyseRow );

    // Go from biggest to smallest possible square
    for ( let largest = maxPossibleLength; largest > 1; --largest ) {
      // Filter out chains that are too small
      const chains = chainsMaster.map( row => {
        return row.filter(c => c.length >= largest);
      });

      for ( let i = 0; i < chains.length - largest + 1; ++i ) {
        for ( const chain of chains[i] ) {
          if ( this.isBox(chains, i, chain, largest) ) {
            return largest;
          }
        }
      }
    }

    return 1;
  }

  private isBox(
    chains: { index: number, length: number }[][],
    row: number,
    chain: { index: number, length: number },
    largest: number,
    count: number = 1
  ): boolean {
    let leftBound = chain.index;
    let rightBound = chain.index + chain.length;

    for ( let o = row + 1; o < chains.length; ++o ) {
      // This forces us to only consider the left branch
      const link = chains[o].find(
        c => c.index <= rightBound - largest
        && c.index + c.length >= leftBound + largest
      );

      if ( isUndefined(link) ) {
        return false;
      }

      if ( link.index > leftBound ) {
        leftBound = link.index;
      }

      if ( link.index + link.length < rightBound ) {
        rightBound = link.index + link.length;
      }

      count++;

      if ( count === largest ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Sum up all the 1s.
   * Useful for finding maximum possible square.
   * @param arr The input array for the whole problem
   * @returns The sum of the matrix
   */
  private sum(arr: number[][]): number {
    return arr.map(
      row => {
        return row.reduce( (prev, curr) => prev + curr );
      }).reduce( (prev, curr) => prev + curr );
  }

  /**
   * Maps a raw input row into a list of chains of 1s.
   * This meta data is useful so we don't have to brute force the square hunt
   * @param row Row from the input array
   * @returns An array containing the index and lengths of each chain
   */
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
