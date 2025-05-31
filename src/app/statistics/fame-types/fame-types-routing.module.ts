import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FameTypesPage } from './fame-types.page';

const routes: Routes = [
  {
    path: '',
    component: FameTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FameTypesPageRoutingModule {}
