import { Component, OnInit } from '@angular/core';

import { Matrix } from '../matrix';
import { LargestMatrixService } from '../largest-matrix.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
  public matrix = new Matrix();
  public largestBox = { edge: 0 };

  constructor(
    private calc: LargestMatrixService
  ) { }

  ngOnInit() {
    // Initialize with the HR canonical case
    this.matrix.ngModelData = [
      [{checked: true}, {checked: true}, {checked: true}, {checked: true}, {checked: true}],
      [{checked: true}, {checked: true}, {checked: true}, {checked: false}, {checked: false}],
      [{checked: true}, {checked: true}, {checked: true}, {checked: false}, {checked: false}],
      [{checked: true}, {checked: true}, {checked: true}, {checked: false}, {checked: false}],
      [{checked: true}, {checked: true}, {checked: true}, {checked: true}, {checked: true}],
    ];

    this.matrix.height = 24;
    this.matrix.length = 24;
  }

  public calcBoxEdge(): number {
    return this.calc.largestMatrix(this.matrix.arr);
  }

  public addCol(): void {
    this.matrix.length++;
  }

  public removeCol(): void {
    this.matrix.length--;
  }
}
