import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderService } from '../../../shared/components/header/header.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

  constructor(private header: HeaderService) {
    this.header.title$.next('404');
  }
}
