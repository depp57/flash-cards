import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { GameRepositoryService } from '../../services/game-repository.service';
import { Theme } from '../../../../shared/models/api-response';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Observable } from 'rxjs';
import { API_IMAGE_SRC } from '../../../../shared/constants';

@Component({
  selector: 'app-select-theme',
  templateUrl: './select-theme.component.html',
  styleUrls: ['./select-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectThemeComponent implements OnInit {

  @Output() selectedTheme = new EventEmitter<Theme>();

  isLoading$!: Observable<boolean>;
  themes!: Observable<Theme[]>;
  readonly IMAGE_SRC = API_IMAGE_SRC;

  constructor(private repository: GameRepositoryService,
              private loader: LoadingService) {}

  ngOnInit(): void {
    this.themes     = this.repository.getThemes();
    this.isLoading$ = this.loader.isLoading$();
  }

  onSelect(theme: Theme): void {
    this.selectedTheme.emit(theme);
  }

  // workaround for use *ngFor directive with number instead of collection
  // @see https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
  createArrayForPlaceholder(nbItems: number): number[] {
    return Array(nbItems);
  }
}
