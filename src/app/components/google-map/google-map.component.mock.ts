import { Component, Input } from '@angular/core';

import { Vehicle } from '../../entities';

@Component({
  selector: 'app-google-map',
  template: '',
})
export class GoogleMapComponentMock {
  @Input() zoom: number;
  @Input() lat: number;
  @Input() lng: number;
  @Input() layerUrls: string[];
  @Input() vehicles: Vehicle[];
  @Input() routeColors: {[key: string]: string};
}
