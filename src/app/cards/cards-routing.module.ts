import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsPage } from './containers/cards.page';


const routes: Routes = [
  {
    path: ':setId',
    component: CardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsPageRoutingModule {}
