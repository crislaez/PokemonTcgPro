import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sets',
    loadChildren: () => import('./views/sets/sets.module').then( m => m.SetsPageModule)
  },
  {
    path: 'set',
    loadChildren: () => import('./views/set/set.module').then( m => m.SetPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./views/cards/cards.module').then( m => m.CardsPageModule)
  },
  {
    path: 'storage',
    loadChildren: () => import('./views/storage/storage.module').then( m => m.StoragePageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
