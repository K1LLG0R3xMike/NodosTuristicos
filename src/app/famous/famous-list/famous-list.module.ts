import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamousListPageRoutingModule } from './famous-list-routing.module';

import { FamousListPage } from './famous-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamousListPageRoutingModule
  ],
  declarations: [FamousListPage]
})
export class FamousListPageModule {}
