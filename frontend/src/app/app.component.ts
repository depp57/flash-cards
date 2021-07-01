import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly _title = 'Flashcards';


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title) {}

  ngOnInit(): void {
    this.setDynamicPageTitle();
  }

  private setDynamicPageTitle(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const lastChild = AppComponent.getChild(this.activatedRoute);
      lastChild.data.subscribe(data => {
        const title = data.title ? `${data.title} - ${this._title}` : this._title;

        this.titleService.setTitle(title);
      });
    });
  }

  private static getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    while (activatedRoute.firstChild) {
      activatedRoute = activatedRoute.firstChild;
    }
    return activatedRoute;
  }
}
