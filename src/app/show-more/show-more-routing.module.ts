import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowMorePage } from './containers/show-more.page';

const routes: Routes = [
  {
    path: ':set',
    component: ShowMorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowMorePageRoutingModule {}
