import { Component, OnInit } from '@angular/core';
import { ErrorModalService } from 'src/app/services/error/error-modal.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { PhotoCoOrdinates } from 'src/app/shared/models/photo-co-ordinates.model';
import ServiceResponse from 'src/app/shared/models/service-response.interface';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  zoom = 3;
  center!: google.maps.LatLngLiteral;
  markers: any = [];

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 3,
  };

  constructor(private photoService: PhotoService,
    private errorModalService: ErrorModalService) { }

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

    this.loadImagesCoOrdinates();
  }

  loadImagesCoOrdinates(): void {
    this.photoService.FetchPhotosCoOrdinates()
      .subscribe({
        next: (response: ServiceResponse) => {
          this.addMarkers(response.data);
          if (this.markers.length > 0) {
            const last = response.data.length - 1;
            this.center = response.data[last];
          }
        },
        error: (error: any) => {
          if(error.status !== 0){
            this.errorModalService.show(error.message, error);
          }
        },
        complete() {

        },
      });
  }

  addMarkers(markers: PhotoCoOrdinates[]) {

    markers.forEach((latLng: PhotoCoOrdinates) => {
      this.markers.push({
        position: latLng,
      });
    });
  }

}
