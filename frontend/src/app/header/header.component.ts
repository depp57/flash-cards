import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(private titleService: HeaderService) {}

  get title(): Observable<string> {
    return this.titleService.title;
  }
}
