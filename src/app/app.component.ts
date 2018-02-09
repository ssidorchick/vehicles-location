import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State, actions, selectors } from './ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  vehicleLocations$: Observable<any>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.vehicleLocations$ = this.store.select(selectors.getVehicleLocations);
    this.vehicleLocations$.subscribe(r => console.log(r));

    this.store.dispatch(new actions.GetVehiclesLocation());
  }
}
