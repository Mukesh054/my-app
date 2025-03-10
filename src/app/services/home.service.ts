import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  isEmpty,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Task } from '../testing-rxjs/testing-rxjs.component';

export interface Car {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  url = 'https://jsonplaceholder.typicode.com/users';
  users: string[] = [];
  private apiData = new BehaviorSubject<Car[]>([]);
  public apiData$ = this.apiData.asObservable();

  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.httpClient
      .get<Task[]>(
        'https://jsonplaceholder.typicode.com/todosA?_start=0&_limit=3'
      )
      .pipe(
        catchError(() => {
          return throwError(() => {
            console.log('Error thrown from Home Service');
            new Error('I am from the Home Service....');
          });
        })
      );
  }

  getProfileData(): Observable<{}> {
    return this.httpClient.get(this.url);
  }

  saveProfileData(data: any): Observable<Boolean> {
    return of(true).pipe(
      tap((x) =>
        setTimeout(() => {
          console.log('Happy');
        })
      )
    );
  }

  headerData() {
    let data = [{ name: 'Happy' }, { name: 'Ram' }];
    return of(data);
  }

  setHeaderData(data: any) { 
    this.apiData.next(data)
  }
}
