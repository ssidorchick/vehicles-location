import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as d3 from 'd3';

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnChanges {
  @Input() zoom: number;
  @Input() lat: number;
  @Input() lng: number;
  @Input() layerUrls;
  @Input() items;
  @ViewChild('map') private mapElement;
  private map;
  private isMapInitialized = false;
  private mapOverlay;
  private mapItemsLayer;
  private itemsUpdated = new Subject();
  private itemsUpdatedSubscription;

  ngOnInit() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: this.zoom,
      center: new google.maps.LatLng(this.lat, this.lng)
    });

    this.layerUrls.map(url => this.map.data.loadGeoJson(url));

    this.itemsUpdatedSubscription = this.itemsUpdated.subscribe(() => this.renderItems());
    this.mapOverlay = new google.maps.OverlayView();
    this.mapOverlay.onAdd = () => {
      this.mapItemsLayer = d3.select(this.mapOverlay.getPanes().overlayLayer).append('div')
        .attr('class', 'vehicles');

      this.mapOverlay.draw = () => this.itemsUpdated.next();
      this.isMapInitialized = true;
    };
    this.mapOverlay.setMap(this.map);
  }

  ngOnDestroy() {
    this.itemsUpdatedSubscription.unsubscribe();
  }

  ngOnChanges() {
    if (this.isMapInitialized) {
      this.itemsUpdated.next();
    }
  }

  private renderItems() {
    if (!this.items) {
      return;
    }

    const projection = this.mapOverlay.getProjection();
    const padding = 10;

    const marker = this.mapItemsLayer.selectAll('svg')
      .data(d3.entries(this.items))
      .each(transform) // update existing markers
    .enter().append('svg')
      .each(transform)
      .attr('class', 'marker');

    marker.append('circle')
      .attr('r', 4.5)
      .attr('cx', padding)
      .attr('cy', padding);

    marker.append('text')
      .attr('x', padding + 7)
      .attr('y', padding)
      .attr('dy', '.31em')
      .text(d => d.value.id);

    function transform(d) {
      // console.log(d.value);
      d = new google.maps.LatLng(d.value.lat, d.value.lng);
      d = projection.fromLatLngToDivPixel(d);
      return d3.select(this)
        .style('left', (d.x - padding) + 'px')
        .style('top', (d.y - padding) + 'px');
    }
  }
}
