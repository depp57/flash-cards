import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeaderService } from '../../../shared/components/header/header.service';
import { Theme } from '../../../shared/models/api-response';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit {

  selectedTheme?: Theme;

  constructor(private header: HeaderService) {}

  ngOnInit(): void {
    this.header.titre$.next('Choix du thème');
  }

  onSelectTheme(theme: Theme) {
    this.selectedTheme = theme;
    this.header.titre$.next(theme.name);
  }
}
