import { DataSource } from '@angular/cdk/collections';
import { Theme } from '../../../shared/models/api-response';
import { BehaviorSubject, Observable } from 'rxjs';

export class ThemeDataSource extends DataSource<Theme> {
  private readonly _dataStream!: BehaviorSubject<Theme[]>;

  constructor() {
    super();
    this._dataStream = new BehaviorSubject<Theme[]>([
      {id: 1, name: 'chargement...', image: null},
      {id: 2, name: 'chargement...', image: null},
      {id: 3, name: 'chargement...', image: null},
    ]);
  }

  connect(): Observable<Theme[]> {
    return this._dataStream;
  }

  disconnect(): void {}

  addTheme(theme: Theme): void {
    this._dataStream.next([theme, ...this._dataStream.value]);
  }

  modifyTheme(theme: Theme): void {
    const themes = this._dataStream.value;
    const index  = themes.findIndex(current => current.id === theme.id);

    if (index > -1) {
      themes[index] = theme;
      this._dataStream.next(themes);
    }
  }

  deleteTheme(theme: Theme): void {
    const themes = this._dataStream.value;
    const index  = themes.indexOf(theme);

    if (index > -1) {
      themes.splice(index, 1);
      this._dataStream.next(themes);
    }
  }

  setThemes(themes: Theme[]): void {
    this._dataStream.next(themes);
  }
}
