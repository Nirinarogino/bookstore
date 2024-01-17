import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button"
import {MatIconModule} from "@angular/material/icon"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatCheckboxModule} from "@angular/material/checkbox"
import{MatRadioModule} from "@angular/material/radio"
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"
import{MatSelectModule} from'@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTabsModule
  ]
  
})
export class MaterialModule { }
