import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from './components/themes.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEditThemeComponent } from './components/dialog-edit-theme/dialog-edit-theme.component';

const routes: Routes = [
  {path: '', component: ThemesComponent}
];

@NgModule({
  declarations: [
    ThemesComponent,
    DialogEditThemeComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ]
})
export class ThemesModule {}
