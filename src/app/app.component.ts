import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-app';

  constructor(private router: Router, homeService: HomeService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        homeService.headerData().subscribe((data) => {
          homeService.setHeaderData(data);
        });
      }
    });
  }
}
