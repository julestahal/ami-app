import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonSegment, IonSegmentButton, IonInput, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-device-tabs',
  templateUrl: './device-tabs.page.html',
  styleUrls: ['./device-tabs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonSegment, IonSegmentButton, IonInput, IonItem, CommonModule, FormsModule, ReactiveFormsModule],
})
export class DeviceTabsPage implements OnInit {
  segment = 'register';  // Default segment selected (Register Device)
  registerForm: FormGroup;
  installForm: FormGroup;
  currentLocation: string = '';  // Initialize as an empty string
  imageUrl: string = '';  // Store the image URL

  constructor(private fb: FormBuilder) {
    // Create the form for registering the device
    this.registerForm = this.fb.group({
      serialNumber: ['', Validators.required],  // Serial number field
      serviceArea: ['', Validators.required],   // Service area field
    });

    // Create the form for device installation
    this.installForm = this.fb.group({
      serialNumber: ['', Validators.required],  // Serial number field
      meterReading: ['', Validators.required],  // Meter reading field
      location: ['', Validators.required],      // Geolocation field
      photo: ['', Validators.required]           // Photo field
    });
  }

  ngOnInit() {}

  // Handle form submission for Register Device
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Register Form Data:', formData);
      alert('Device Registered Successfully!');
      // You can save the data here (e.g., make an API call to save to a server)
    } else {
      alert('Please fill out all fields.');
    }
  }

  // Handle form submission for Device Installation
  onInstallSubmit() {
    if (this.installForm.valid) {
      const formData = this.installForm.value;
      console.log('Install Form Data:', formData);
      alert('Device Installation Complete!');
      // You can save the data here (e.g., make an API call to save to a server)
    } else {
      alert('Please fill out all fields.');
    }
  }

  // Handle segment change
  segmentChanged(event: any) {
    this.segment = event.detail.value; // Update the segment variable when the tab changes
  }

  // Get geolocation
  async getGeolocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.currentLocation = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
      this.installForm.patchValue({ location: this.currentLocation });
    } catch (error) {
      console.error('Error getting location', error);
      this.currentLocation = 'Location unavailable';  // Fallback value
      this.installForm.patchValue({ location: this.currentLocation });
    }
  }

  // Capture a photo using the Camera plugin
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Uri,  // Return a URI for the image
        source: CameraSource.Camera,       // Use the camera for capturing
        allowEditing: false,
        saveToGallery: false
      });
      this.imageUrl = image.webPath || '';  // Store the image URL in the component
      this.installForm.patchValue({ photo: this.imageUrl }); // Store the photo URL in the form
    } catch (error) {
      console.error('Error taking photo', error);
    }
  }
}
