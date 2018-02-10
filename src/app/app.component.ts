import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { VehicleLocation } from './models';
import { State, actions, selectors } from './ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  mapZoom = 12;
  mapLat = 37.773972;
  mapLng = -122.431297;
  routeLayerUrls$: Observable<string[]>;
  vehicleLocations$: Observable<VehicleLocation[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.routeLayerUrls$ = this.store.select(selectors.getRouteLayerUrls);
    this.vehicleLocations$ = this.store.select(selectors.getVehicleLocations);

    this.store.dispatch(new actions.GetVehiclesLocation());
  }
}
