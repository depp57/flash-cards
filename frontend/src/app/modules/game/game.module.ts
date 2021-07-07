import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game.component';
import { SelectThemeComponent } from './components/select-theme/select-theme.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayCardComponent } from './components/play-card/play-card.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: GameComponent}
];

@NgModule({
  declarations: [
    GameComponent,
    SelectThemeComponent,
    PlayCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class GameModule {}
