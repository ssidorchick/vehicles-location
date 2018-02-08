import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State, actions } from './ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new actions.TestAction());
  }
}
