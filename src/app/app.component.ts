import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Vehicle } from './models';
import { State, actions, selectors } from './ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  mapZoom = 12;
  mapLat = 37.773972;
  mapLng = -122.431297;
  routeLayerUrls$: Observable<string[]>;
  vehicles$: Observable<Vehicle[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.routeLayerUrls$ = this.store.select(selectors.getRouteLayerUrls);
    this.vehicles$ = this.store.select(selectors.getVehicleLocations);

    this.store.dispatch(new actions.StartVehiclesAutoupdate());
  }

  ngOnDestroy() {
    this.store.dispatch(new actions.StopVehiclesAutoupdate());
  }
}
