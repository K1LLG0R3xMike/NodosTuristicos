import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopPlacesPageRoutingModule } from './top-places-routing.module';

import { TopPlacesPage } from './top-places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopPlacesPageRoutingModule
  ],
  declarations: [TopPlacesPage]
})
export class TopPlacesPageModule {}
