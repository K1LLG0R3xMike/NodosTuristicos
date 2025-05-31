import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FameTypesPageRoutingModule } from './fame-types-routing.module';

import { FameTypesPage } from './fame-types.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FameTypesPageRoutingModule
  ],
  declarations: [FameTypesPage]
})
export class FameTypesPageModule {}
