import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule {}
