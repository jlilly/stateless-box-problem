import { Injectable } from '@angular/core';
import { isNull, isUndefined } from 'util';

interface Segment {
  index: number;
  length: number;
}

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
  private analyseRow(row: number[]): Segment[] {
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

  private isBox(
    chains: Segment[][],
    row: number,
    chain: Segment,
    largest: number,
    count: number = 1,
    bounds: { left: number, right: number } = { left: chain.index, right: chain.index + chain.length }
  ): boolean {
    if ( row + 1 === chains.length ) {
      return false;
    }

    if ( chain.index > bounds.left ) {
      bounds.left = chain.index;
    }

    if ( chain.index + chain.length < bounds.right ) {
      bounds.right = chain.index + chain.length;
    }

    if ( bounds.left + bounds.right < largest ) {
      return false;
    }

    const links = chains[row + 1].filter(
      c => c.index <= bounds.right - largest
      && c.index + c.length >= bounds.left + largest
    );

    if ( links.length === 0 ) {
      return false;
    }

    count++;

    if ( count === largest ) {
      return true;
    }

    // Do it again
    for ( const link of links ) {
      if ( this.isBox(chains, row + 1, link, largest, count, bounds) ) {
        return true;
      }
    }

    return false;
  }


}
