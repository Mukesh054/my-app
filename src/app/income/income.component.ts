import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import {
  combineAll,
  combineLatest,
  concat,
  concatAll,
  delay,
  empty,
  from,
  fromEvent,
  interval,
  map,
  Observable,
  of,
  range,
  startWith,
  take,
  timer,
} from 'rxjs';

const myAnimation = trigger('openClose', [
  state(
    'open',
    style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow',
    })
  ),
  state(
    'closed',
    style({
      height: '100px',
      opacity: 0.8,
      backgroundColor: 'blue',
      color: 'white',
    })
  ),
  transition('open => closed', [animate('1s')]),
  transition('closed => open', [animate('0.5s')]),
]);

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  animations: [myAnimation],
})
export class IncomeComponent implements OnInit {
  isOpenAnimationDiv = true;

  ngOnInit() {
    
    const a = interval(1000);

    const b = a.pipe(map(val => of(val + 10)), concatAll());

    // b.subscribe(x => console.log(x))
  }

  toggleAnimation() {
    this.isOpenAnimationDiv = !this.isOpenAnimationDiv;
  }
}
