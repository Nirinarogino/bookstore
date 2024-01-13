import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { SharedRoutingModule } from './shared-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    
  ],
exports: [
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule

  ]
})
export class SharedModule { }
