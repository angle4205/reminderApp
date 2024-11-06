import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.page.html',
  styleUrls: ['./new-location.page.scss'],
})
export class NewLocationPage implements OnInit {
  locationName: string = '';
  locationLat: number = 0;
  locationLong: number = 0;

  constructor(
    private LocationService: LocationService, 
    private storage: Storage, 
    private router: Router
  ) { }

  async ngOnInit() {
    this.loadLocation();
    await this.storage.create();
  }

  async loadLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.locationLat = coordinates.coords.latitude;
      this.locationLong = coordinates.coords.longitude;
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  async updateLocation() {
    await this.loadLocation();
  }

  async saveLocation() {
    const location = {
      locationName: this.locationName,
      locationLong: this.locationLong,
      locationLat: this.locationLat
    }
    try {
      await this.LocationService.addLocation(location);
      console.log('Location added');
    } catch (error) {
      console.error('Error adding reminder:',error);
    }
  }
}
