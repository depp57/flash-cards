import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderService } from '../../../shared/components/header/header.service';
import { Theme } from '../../../shared/models/api-response';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {

  selectedTheme?: Theme;

  constructor(private header: HeaderService) {
    this.header.title$.next('Choix du thème');

  }

  onSelectTheme(theme: Theme) {
    this.selectedTheme = theme;
    this.header.title$.next(theme.name);
  }
}
