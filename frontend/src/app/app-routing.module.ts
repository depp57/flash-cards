import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'jeu', data: {title: 'Jeu'},
    loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule)
  },
  {
    path: 'themes', data: {title: 'Thèmes'},
    loadChildren: () => import('./modules/themes/themes.module').then(m => m.ThemesModule)
  },
  {
    path: 'cartes', data: {title: 'Cartes'},
    loadChildren: () => import('./modules/cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: '**', data: {title: '404'},
    loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule)
  } // redirect all 404 pages
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
