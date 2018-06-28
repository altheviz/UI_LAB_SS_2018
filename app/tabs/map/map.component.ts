import { Component, OnInit, ViewChild } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
import * as Permissions from "nativescript-permissions";

import { ContentService } from "~/models/content.service";
import { Customer } from "~/models/customer";

const permissions = require("nativescript-permissions");

declare var android: any;

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => MapView);

@Component({
    selector: "Map",
    providers: [ContentService],
    moduleId: module.id,
    templateUrl: "./map.component.html"
})

export class MapComponent implements OnInit {

    latitude = -33.86;
    longitude = 151.20;
    zoom = 8;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    lastCamera: string;

    constructor(private contentService: ContentService) { }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION,
            "I need these permissions because I'm cool");
    }

    // Map events
    onMapReady(event) {
        console.log("Map Ready");

        this.mapView = event.object;

        // Default View Setting (Germany)
        this.mapView.latitude = Number(48.989953);
        this.mapView.longitude = Number(8.359292);
        this.mapView.zoom = 12;

        // Settings
        this.mapView.settings.compassEnabled = true;
        this.mapView.settings.zoomControlsEnabled = true;
        this.mapView.settings.myLocationButtonEnabled = true;
        const gMap = this.mapView.gMap;
        gMap.setMyLocationEnabled(true);

        console.log("Setting a marker...");

        // Initialize marker
        let marker = new Marker();

        // Adding Customers from Database
        let idx = 0;

        this.contentService.getAll<Customer>(this.contentService.customers).then((customersData) => {
            customersData.forEach((customerElement) => {

                console.log("Add Customer");

                marker = new Marker();
                marker.position = Position.positionFromLatLng(customerElement.geolocation.latitude,
                    customerElement.geolocation.longitude);
                marker.title = customerElement.name;
                marker.snippet = "Phone: " + customerElement.phone;
                marker.userData = { index: idx };

                // Set Marker Color
                if (customerElement.name === "Aladdin Inc.") {
                    marker.color = "yellow";
                } else if (customerElement.name === "Hochschule Karlsruhe") {
                    marker.color = "blue";
                } else {
                    marker.color = "red";
                }

                // Add Marker
                this.mapView.addMarker(marker);

                idx++;
            });
        });
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
