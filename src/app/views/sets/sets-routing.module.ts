import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetsPage } from './containers/sets.page';

const routes: Routes = [
  {
    path: '',
    component: SetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetsPageRoutingModule {}
