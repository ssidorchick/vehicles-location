import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Vehicle } from '../entities';

@Injectable()
export class VehiclesService {
  private readonly baseUrl = 'http://webservices.nextbus.com/service/publicJSONFeed';

  constructor(private http: HttpClient) { }

  get(routes: string[]): Observable<Vehicle[]> {
    if (routes.length === 0) {
      return of([]);
    }

    const requests = routes.map(route => {
      const params = new HttpParams()
        .set('command', 'vehicleLocations')
        .set('a', 'sf-muni')
        .set('r', route)
        .set('t', '0');
      return this.http.get<any>(this.baseUrl, {params});
    });
    return forkJoin(requests).pipe(
      map(responses => {
        const vehicles = responses.reduce((memo, item) => memo.concat(item.vehicle), []);
        return vehicles.map(item => ({
          id: item.id,
          route: item.routeTag,
          location: {
            lat: +item.lat,
            lng: +item.lon,
          },
        }));
      }),
    );
  }
}
