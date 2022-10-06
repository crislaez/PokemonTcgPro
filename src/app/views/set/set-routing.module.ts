import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetPage } from './containers/set.page';

const routes: Routes = [
  {
    path: ':setId',
    component: SetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPageRoutingModule {}
