import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomQuery2Page } from './custom-query2.page';

const routes: Routes = [
  {
    path: '',
    component: CustomQuery2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomQuery2PageRoutingModule {}
