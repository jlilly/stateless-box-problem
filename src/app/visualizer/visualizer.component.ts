import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  public matrix = [
    [{checked: true}, {checked: true}, {checked: true}, {checked: true}, {checked: true}],
    [{checked: true}, {checked: true}, {checked: true}, {checked: false}, {checked: false}],
    [{checked: true}, {checked: true}, {checked: true}, {checked: false}, {checked: false}],
    [{checked: true}, {checked: true}, {checked: true}, {checked: false}, {checked: false}],
    [{checked: true}, {checked: true}, {checked: true}, {checked: true}, {checked: true}],
  ];

  constructor() { }

  ngOnInit() {
  }

}
