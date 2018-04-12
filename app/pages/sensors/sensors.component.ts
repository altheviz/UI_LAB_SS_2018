import { Component, NgZone, OnInit} from "@angular/core";

import * as Geolocation from "nativescript-geolocation";
import { Router } from "@angular/router";

import { SegmentedBarItem } from "ui/segmented-bar";
import { Accuracy } from "ui/enums";
import { Label } from "ui/label";

import view = require("ui/core/view");
import pages = require("ui/page");

import observable = require("data/observable");

import { EventData, Observable } from 'data/observable';
import { BindingOptions } from "ui/core/bindable";

import * as app from "tns-core-modules/application";
import * as platform from "tns-core-modules/platform";


@Component({
  selector: "sensors",
  moduleId: module.id,
  templateUrl: "./sensors.html",
  styleUrls: ["./sensors-common.css", "./sensors.css"],
})
export class SensorsComponent {

  public latitude: number;
  public longitude: number;

  public azimuth: number;
  public pitch: number;
  public roll: number;

  public temperature: number;

  public magenticX: number;
  public magenticY: number;
  public magenticZ: number;

  public gyroX: number;
  public gyroY: number;
  public gyroZ: number;

  public light: number;

  public constructor(private router: Router) {
    this.latitude = 0;
    this.longitude = 0;

    this.azimuth = 0;
    this.pitch = 0;
    this.roll = 0;

    this.temperature = 0;

    this.magenticX = 0;
    this.magenticY = 0;
    this.magenticZ = 0;

    this.gyroX = 0;
    this.gyroY = 0;
    this.gyroZ = 0;

    this.light = 0;

    this.updateLocation();

  }

  private getDeviceLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      Geolocation.enableLocationRequest().then(() => {
        Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
          resolve(location);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

  public updateLocation() {
    this.getDeviceLocation().then(result => {
      this.latitude = result.latitude;
      this.longitude = result.longitude;
    }, error => {
      console.error(error);
    });
  }

  onAccuracyChanged(sensor, accuracy) {
    console.log('onAccuracyChanged:', accuracy);
  }

  onSensorChanged(event) {
    if(event.sensor.getType() == android.hardware.Sensor.TYPE_ACCELEROMETER){
      this.azimuth = event.values[0];
      this.pitch = event.values[1];
      this.roll = event.values[2];

      console.log('azimuth', this.azimuth);
      console.log('pitch', this.pitch);
      console.log('roll', this.roll);

    }else if(event.sensor.getType() == android.hardware.Sensor.TYPE_AMBIENT_TEMPERATURE){
      this.temperature = event.values[0];

      console.log('Temperature', event.values[0]);

    }else if(event.sensor.getType() == android.hardware.Sensor.TYPE_MAGNETIC_FIELD){
      this.magenticX = event.values[0];
      this.magenticY = event.values[1];
      this.magenticZ = event.values[2];

      console.log('Magnetic X', event.values[0]);
      console.log('Magnetic Y', event.values[1]);
      console.log('Magnetic Z', event.values[2]);

    }else if(event.sensor.getType() == android.hardware.Sensor.TYPE_GYROSCOPE){
      this.gyroX = event.values[0];
      this.gyroY = event.values[1];
      this.gyroZ = event.values[2];

      console.log('Gyro X', event.values[0]);
      console.log('Gyro Y', event.values[1]);
      console.log('Gyro Z', event.values[2]);
      
    }else if(event.sensor.getType() == android.hardware.Sensor.TYPE_LIGHT){  
      this.light = event.values[0];

      console.log('Light', event.values[0])

    }else{  
      //console.log('Other Sensor: ', event.sensor.getType())
    }
  }

  ngOnInit() {
    var sensorManager = app.android.foregroundActivity.getSystemService(
          android.content.Context.SENSOR_SERVICE
        ),
        accelerometer,
        temperature,
        magnetic,
        gyroscope,
        light,
        sensorActivity;
  
    sensorActivity = new android.hardware.SensorEventListener({
      onAccuracyChanged: this.onAccuracyChanged,
      onSensorChanged: this.onSensorChanged
    });
  
    accelerometer = sensorManager.getDefaultSensor(
      android.hardware.Sensor.TYPE_ACCELEROMETER
    );

    temperature = sensorManager.getDefaultSensor(
      android.hardware.Sensor.TYPE_AMBIENT_TEMPERATURE
    );

    magnetic = sensorManager.getDefaultSensor(
      android.hardware.Sensor.TYPE_MAGNETIC_FIELD
    );

    gyroscope = sensorManager.getDefaultSensor(
      android.hardware.Sensor.TYPE_GYROSCOPE
    );

    light = sensorManager.getDefaultSensor(
      android.hardware.Sensor.TYPE_LIGHT
    );
  
    sensorManager.registerListener(sensorActivity,accelerometer,android.hardware.SensorManager.SENSOR_DELAY_NORMAL);
    sensorManager.registerListener(sensorActivity,temperature,android.hardware.SensorManager.SENSOR_DELAY_NORMAL);
    sensorManager.registerListener(sensorActivity,magnetic,android.hardware.SensorManager.SENSOR_DELAY_NORMAL);
    sensorManager.registerListener(sensorActivity,gyroscope,android.hardware.SensorManager.SENSOR_DELAY_NORMAL);
    sensorManager.registerListener(sensorActivity,light,android.hardware.SensorManager.SENSOR_DELAY_NORMAL);

  }

  openSensors() {
    this.router.navigate(["/sensors"]);
  }

  openCamera() {
    this.router.navigate(["/camera"]);
  }

  openList() {
    this.router.navigate(["/list"]);
  }

}      