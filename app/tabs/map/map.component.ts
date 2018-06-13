import { Component, OnInit, ViewChild } from "@angular/core";
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import * as Permissions from "nativescript-permissions";

var permissions = require("nativescript-permissions");


declare var android: any;

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
    selector: "Map",
    moduleId: module.id,
    templateUrl: "./map.component.html"
})


export class MapComponent implements OnInit {

    latitude =  -33.86;
    longitude = 151.20;
    zoom = 8;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    lastCamera: String;

    constructor() {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION, "I need these permissions because I'm cool")
            .then(function() {
                console.log("Woo Hoo, I have the power!");

               /* if(this.mapView.android) {
                    //ToDo
                    console.log("Location enabled Android");
                }

                if(this.mapView.ios) {
                    //ToDo
                    console.log("Location enabled iOS");
                }*/
                
            })
            .catch(function() {
                console.log("Uh oh, no permissions - plan B time!");
            });
    }

    //Map events
    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object;

        // Default View Setting (Germany)
        this.mapView.latitude = Number(48.944694);
        this.mapView.longitude = Number(9.769593);
        this.mapView.zoom = 7;

        // Settings
        this.mapView.settings.compassEnabled = true;
        this.mapView.settings.zoomControlsEnabled = true;
        this.mapView.settings.myLocationButtonEnabled = true;
        var gMap = this.mapView.gMap;
        gMap.setMyLocationEnabled(true);

        console.log("Setting a marker...");

        // Adding a marker
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(49.015083, 8.389895);
        marker.title = "HSKA";
        marker.snippet = "Karlsruhe";
        marker.userData = {index: 1};
        marker.color = 'red'
        this.mapView.addMarker(marker);

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(49.293699, 8.641694);
        marker.title = "SAP SE";
        marker.snippet = "Walldorf";
        marker.userData = {index: 2};
        marker.color = 'blue'
        this.mapView.addMarker(marker);

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(49.496634, 8.433524);
        marker.title = "BASF SE";
        marker.snippet = "Ludwigshafen";
        marker.userData = {index: 3};
        marker.color = 'blue'
        this.mapView.addMarker(marker);

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(48.176753, 11.559966);
        marker.title = "BMW AG";
        marker.snippet = "München";
        marker.userData = {index: 2};
        marker.color = 'blue'
        this.mapView.addMarker(marker);

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(48.786267, 9.241270);
        marker.title = "Daimler AG";
        marker.snippet = "Stuttgart";
        marker.userData = {index: 2};
        marker.color = 'green'
        this.mapView.addMarker(marker);


    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);       
    }
}
