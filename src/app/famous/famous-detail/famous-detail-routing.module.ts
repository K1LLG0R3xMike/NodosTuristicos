import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamousDetailPage } from './famous-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FamousDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamousDetailPageRoutingModule {}
