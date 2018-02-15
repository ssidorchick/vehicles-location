import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Marker } from './components/google-map';
import { routeLayerUrls, routes, routeColors, Vehicle } from './entities';
import { State, actions, selectors } from './ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  mapZoom = 12;
  mapLat = 37.773972;
  mapLng = -122.431297;
  routeLayerUrls = routeLayerUrls;
  routes = routes;
  routeColors = routeColors;
  markers$: Observable<Marker[]>;
  routesForm: FormGroup;

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.routesForm = this.fb.group({
      enabledRoutes: [routes],
    });
  }

  ngOnInit() {
    this.markers$ = this.store.select(selectors.getVehicleLocations).pipe(
      map(vehicles => vehicles.map(vehicle => ({
        id: vehicle.id,
        location: vehicle.location,
        group: vehicle.route,
        text: `${vehicle.route}: ${vehicle.id}`,
      }))),
    );

    this.routesForm.valueChanges.subscribe(changes => {
      const {enabledRoutes} = changes;
      this.store.dispatch(new actions.EnableRoutesAction(enabledRoutes));
    });

    this.store.dispatch(new actions.StartVehiclesAutoupdate());
  }

  ngOnDestroy() {
    this.store.dispatch(new actions.StopVehiclesAutoupdate());
  }
}
