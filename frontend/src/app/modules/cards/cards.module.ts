import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './components/cards.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: CardsComponent}
];

@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CardsModule {}
