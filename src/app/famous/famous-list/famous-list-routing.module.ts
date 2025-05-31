import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamousListPage } from './famous-list.page';

const routes: Routes = [
  {
    path: '',
    component: FamousListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamousListPageRoutingModule {}
