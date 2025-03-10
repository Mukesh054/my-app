import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestingRxjsService implements ErrorHandler {
  constructor() {}

  handleError(error: unknown) {
    console.log(error, "My Error.....");
  }
}
