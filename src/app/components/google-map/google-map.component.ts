import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as d3 from 'd3';

import { Vehicle } from '../../entities';

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnChanges {
  @Input() zoom: number;
  @Input() lat: number;
  @Input() lng: number;
  @Input() layerUrls: string[];
  @Input() vehicles: Vehicle[];
  @Input() routeColors: {[key: string]: string};
  @ViewChild('map') private mapElement;
  private map;
  private isMapInitialized = false;
  private mapOverlay;
  private mapVehiclesLayer;
  private vehiclesUpdated = new Subject<boolean>();
  private vehiclesUpdatedSubscription;

  ngOnInit() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: this.zoom,
      center: new google.maps.LatLng(this.lat, this.lng),
    });

    this.layerUrls.map(url => this.map.data.loadGeoJson(url));

    this.vehiclesUpdatedSubscription = this.vehiclesUpdated.subscribe(transition => this.renderItems(transition));
    this.mapOverlay = new google.maps.OverlayView();
    this.mapOverlay.onAdd = () => {
      this.mapVehiclesLayer = d3.select(this.mapOverlay.getPanes().overlayLayer).append('div')
        .attr('class', 'vehicles');

      this.mapOverlay.draw = () => this.vehiclesUpdated.next(false);
      this.isMapInitialized = true;
    };
    this.mapOverlay.setMap(this.map);
  }

  ngOnDestroy() {
    this.vehiclesUpdatedSubscription.unsubscribe();
  }

  ngOnChanges() {
    if (this.isMapInitialized) {
      this.vehiclesUpdated.next(true);
    }
  }

  private renderItems(transition = false) {
    if (!this.vehicles) {
      return;
    }

    const projection = this.mapOverlay.getProjection();
    const radius = 4.5;
    const textXOffset = 7;
    const textSize = '.31em';
    const padding = 10;

    const transform = (transition = false) => function transform(d) {
      const {location} = d;
      d = new google.maps.LatLng(location.lat, location.lng);
      d = projection.fromLatLngToDivPixel(d);
      let selection: any = d3.select(this);
      if (transition) {
        selection = selection
          .transition()
          .duration(500);
      }
      selection
        .style('left', (d.x - padding) + 'px')
        .style('top', (d.y - padding) + 'px');
    };

    const marker: d3.Selection<SVGGElement, Vehicle, SVGGElement, Vehicle> = this.mapVehiclesLayer.selectAll('svg')
      .data(this.vehicles, item => item.id);

    marker.exit().remove();

    const markerEnter = marker.enter()
      .append('svg')
      .attr('class', 'marker');

    markerEnter.append('circle')
      .attr('r', radius)
      .attr('cx', padding)
      .attr('cy', padding)
      .attr('fill', d => this.routeColors[d.route]);

    markerEnter.append('text')
      .attr('x', padding + textXOffset)
      .attr('y', padding)
      .attr('dy', textSize)
      .attr('fill', d => this.routeColors[d.route])
      .text(d => `${d.route}: ${d.id}`);

    marker
      .each(transform(transition));

    markerEnter.each(transform());
  }
}
