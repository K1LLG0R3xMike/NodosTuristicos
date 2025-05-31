import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomQuery1PageRoutingModule } from './custom-query1-routing.module';

import { CustomQuery1Page } from './custom-query1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomQuery1PageRoutingModule
  ],
  declarations: [CustomQuery1Page]
})
export class CustomQuery1PageModule {}
