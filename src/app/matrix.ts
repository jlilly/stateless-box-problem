import { isNullOrUndefined } from 'util';

export class Matrix {
  private data: { checked: boolean }[][] = [[]];
  set ngModelData( d: { checked: boolean }[][] ) {
    if ( this.isEmpty(d) ) {
        return;
    }
    this.data = d;
  }
  get ngModelData(): { checked: boolean }[][] {
    return this.data;
  }

  set arr( arr: number[][] ) {
    if ( this.isEmpty(arr) ) {
        return;
    }
    this.data = arr.map(
      row => row.map( n => ({ checked: n === 1 }) )
    );
  }
  get arr(): number[][] {
      return this.data.map(
        row => row.map( n => n.checked ? 1 : 0 )
      );
  }

  set length( l: number ) {
    if ( l < 0 ) {
      return;
    }
    if ( l === 0 ) {
      this.data = [[]];
      return;
    }

    const length = this.data[0].length;
    if ( l === length ) {
        return;
    }
    if ( l < length ) {
      // remove
      for ( let row of this.data ) {
        row = row.splice(l, length - l);
      }
      return;
    }
    // add
    for ( const row of this.data ) {
      for ( let i = length; i < l; ++i ) {
        row.push({checked: false});
      }
    }
  }
  get length(): number {
    return this.data[0].length;
  }

  set height( h: number ) {
    if ( h < 0 ) {
      return;
    }
    if ( h === 0 ) {
      this.data = [[]];
      return;
    }

    const height = this.data.length;
    if ( h === height ) {
        return;
    }
    if ( h < height ) {
      // remove
      this.data.splice(h, height - h);
      return;
    }
    // add
    for ( let i = height; i < h; ++i ) {
      const newRow = [];
      for ( const col of this.data[0] ) {
        newRow.push({checked: false});
      }
      this.data.push(newRow);
    }
  }
  get height(): number {
    return this.data.length;
  }

  private isEmpty( a: any[][] ): boolean {
    return isNullOrUndefined(a) || a.length === 0 || a[0].length === 0;
  }
}
