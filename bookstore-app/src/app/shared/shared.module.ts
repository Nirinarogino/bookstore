import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material.module';
import { ShortPipe } from './pipes/short_text.pipe';

@NgModule({
  declarations: [
    ShortPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
exports: [
  MaterialModule,
  ShortPipe

],
})
export class SharedModule { }
