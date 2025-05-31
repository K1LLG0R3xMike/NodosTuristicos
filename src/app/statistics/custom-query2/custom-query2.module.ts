import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomQuery2PageRoutingModule } from './custom-query2-routing.module';

import { CustomQuery2Page } from './custom-query2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomQuery2PageRoutingModule
  ],
  declarations: [CustomQuery2Page]
})
export class CustomQuery2PageModule {}
