import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material.module';
import { ShortPipe } from './pipes/short_text.pipe';
import { NgxTypedJsModule } from 'ngx-typed-js';

@NgModule({
  declarations: [
    ShortPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxTypedJsModule
  ],
exports: [
  MaterialModule,
  ShortPipe,
  NgxTypedJsModule

],
})
export class SharedModule { }
