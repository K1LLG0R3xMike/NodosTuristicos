import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityListPageRoutingModule } from './city-list-routing.module';

import { CityListPage } from './city-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CityListPageRoutingModule
  ],
  declarations: [CityListPage]
})
export class CityListPageModule {}
