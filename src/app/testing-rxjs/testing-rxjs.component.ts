import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HomeService } from '../services/home.service';

export interface Task {
  id: number;
  title: string;
}

@Component({
  selector: 'app-testing-rxjs',
  templateUrl: './testing-rxjs.component.html',
  styleUrls: ['./testing-rxjs.component.scss'],
})
export class TestingRxjsComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  error: Error | null = null;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.tasks$ = this.homeService.getData().pipe(
      tap({
        error: (error) => this.error = error,
      }),
      catchError(error => of([])),
    );
  }
}
