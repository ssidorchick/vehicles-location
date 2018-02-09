import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { VehicleLocation } from '../models';

@Injectable()
export class VehiclesLocationService {
  private readonly baseUrl = 'http://webservices.nextbus.com/service/publicJSONFeed';

  constructor(private http: HttpClient) { }

  get(): Observable<VehicleLocation[]> {
    const timestamp = +new Date() - 60000;
    return this.http.get<any>(`${this.baseUrl}?command=vehicleLocations&a=sf-muni&r=N&t=${timestamp}`).pipe(
      map(response => {
        const {vehicle} = response;
        return vehicle.map(item => ({
          id: item.id,
          lat: +item.lat,
          lng: +item.lon,
        }));
      })
    );
  }
}
