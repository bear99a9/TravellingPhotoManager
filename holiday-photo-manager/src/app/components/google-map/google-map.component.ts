import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit{

  zoom = 4;
  center!: google.maps.LatLngLiteral;
  markers: any = [];

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 3,
  };

  ngOnInit() {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };
    // });

    this.center = {
      lat: -25.2637399,
      lng: -57.57592599999998
    };
  }
  
  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }
  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }

  click(event: google.maps.MapMouseEvent) {
    console.log(event);
    this.addMarker(event);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    let wtf = event.latLng?.toJSON();
    console.log(wtf);
    this.markers.push({
      position: event.latLng?.toJSON(),
      label: {
        color: 'red',
        // text: 'Marker label ' + (this.markers.length + 1),
      },
      // title: 'Marker title ' + (this.markers.length + 1),
      // info: 'Marker info ' + (this.markers.length + 1),
      options: {
      },
    });
  }
}
