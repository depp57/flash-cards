import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './components/cards.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEditCardComponent } from './components/dialog-edit-card/dialog-edit-card.component';

const routes: Routes = [
  {path: '', component: CardsComponent}
];

@NgModule({
  declarations: [
    CardsComponent,
    DialogEditCardComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class CardsModule {}
