import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards.component';
import { SelectThemeComponent } from './components/select-theme/select-theme.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayCardComponent } from './components/play-card/play-card.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: CardsComponent}
];

@NgModule({
  declarations: [
    CardsComponent,
    SelectThemeComponent,
    PlayCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
    MatIconModule
  ]
})
export class GameModule {}
