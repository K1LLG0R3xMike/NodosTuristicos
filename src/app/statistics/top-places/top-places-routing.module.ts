import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopPlacesPage } from './top-places.page';

const routes: Routes = [
  {
    path: '',
    component: TopPlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopPlacesPageRoutingModule {}
