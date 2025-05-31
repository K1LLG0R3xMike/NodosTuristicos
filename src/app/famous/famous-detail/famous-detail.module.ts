import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamousDetailPageRoutingModule } from './famous-detail-routing.module';

import { FamousDetailPage } from './famous-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamousDetailPageRoutingModule
  ],
  declarations: [FamousDetailPage]
})
export class FamousDetailPageModule {}
