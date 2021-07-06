import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  isLoading$ = this.loader.isLoading$();

  constructor(private titleService: HeaderService,
              private loader: LoadingService) {}

  get title(): Observable<string> {
    return this.titleService.titre$;
  }
}
