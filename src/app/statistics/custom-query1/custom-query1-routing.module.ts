import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomQuery1Page } from './custom-query1.page';

const routes: Routes = [
  {
    path: '',
    component: CustomQuery1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomQuery1PageRoutingModule {}
