import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LargestMatrixService } from './largest-matrix.service';
import { VisualizerComponent } from './visualizer/visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [ LargestMatrixService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
