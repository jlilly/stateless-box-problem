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
  }

  public calcBoxEdge(): number {
    return this.calc.largestMatrix(this.matrix.arr);
  }

}
