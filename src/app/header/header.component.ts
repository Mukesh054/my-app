import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(homeService: HomeService) {
    homeService.apiData$.subscribe((data) => console.log('Header Data', data));
  }

  ngOnInit(): void {}
}
