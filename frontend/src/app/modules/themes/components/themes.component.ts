import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '../../../shared/components/header/header.service';
import { Theme } from '../../../shared/models/api-response';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditThemeComponent } from './dialog-edit-theme/dialog-edit-theme.component';
import { API_IMAGE_SRC } from '../../../shared/constants';
import { ThemeDataSource } from '../models/theme-data-source';
import { ThemesRepositoryService } from '../services/themes-repository.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ThemesComponent {

  displayedColumns: string[] = ['name', 'image'];
  dataSource                 = new ThemeDataSource();

  readonly IMAGE_SRC = API_IMAGE_SRC;

  constructor(private header: HeaderService,
              private repository: ThemesRepositoryService,
              private dialog: MatDialog) {

    this.repository.getThemes().subscribe(
      themes => this.dataSource.setThemes(themes)
    );
    this.header.title$.next('Modifier les thèmes');
  }

  addTheme(): void {
    const newTheme: Theme = {
      id: -1,
      name: '',
      image: null
    };

    const dialogRef = this.dialog.open(DialogEditThemeComponent, {
      data: newTheme,
      width: 'min(80%, 600px)',
      height: 'min(70%, 800px)'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result.id) {
          this.repository.createTheme({theme_name: result.name, theme_image: result.image}).subscribe(
            created => {
              if (created.success) {
                this.dataSource.addTheme({id: -1, name: result.name, image: null})
              }
              else {
                alert(created.cause);
              }
            }
          );
        }
      }
    );
  }

  onSelectTheme(theme: Theme) {
    const dialogRef = this.dialog.open(DialogEditThemeComponent, {
      data: theme,
      width: 'min(80%, 600px)',
      height: 'min(70%, 800px)'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === 'delete') {
          this.repository.deleteTheme(theme).subscribe(
            deleted => {
              if (deleted.success) {
                this.dataSource.deleteTheme(theme);
              }
              else {
                alert(deleted.cause);
              }
            }
          );
        }

        else if (result.id) {
          this.repository.modifyTheme(theme, {theme_name: result.name, theme_image: result.image}).subscribe(
            modified => {
              if (modified.success) {
                this.dataSource.modifyTheme({id: theme.id, name: result.name, image: null});
              }
              else {
                alert(modified.cause);
              }
            }
          );
        }
      }
    );
  }
}
