import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";

import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";

import { TextField } from "ui/text-field";
import { Router } from "@angular/router";

import * as SocialShare from "nativescript-social-share";

import * as frameModule from "ui/frame";
const topmost = frameModule.topmost();

import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageSource } from 'tns-core-modules/image-source';
import { ImageAsset } from 'tns-core-modules/image-asset';
import { layout } from 'tns-core-modules/utils/utils';
import * as app from "tns-core-modules/application";

import * as flashlight from "nativescript-flashlight";

@Component({
  selector: "list",
  moduleId: module.id,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"],
  providers: [GroceryListService]
})
export class ListComponent implements OnInit {
    groceryList: Array<Grocery> = [];

    public saveToGallery: boolean = true;
    public cameraImage: ImageAsset;

    grocery = "";
    isLoading = true;
    listLoaded = false;
    @ViewChild("groceryTextField") groceryTextField: ElementRef;

    constructor(private groceryListService: GroceryListService, private zone: NgZone, private router: Router) {}

    ngOnInit() {
        this.isLoading = true;
        this.groceryListService.load()
          .subscribe(loadedGroceries => {
            loadedGroceries.forEach((groceryObject) => {
              this.groceryList.unshift(groceryObject);
            });
            this.isLoading = false;
            this.listLoaded = true;
        });
    }

    add() {
        if (this.grocery.trim() === "") {
          alert("Enter a grocery item");
          return;
        }
      
        // Dismiss the keyboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
      
        this.groceryListService.add(this.grocery)
        .subscribe(
            groceryObject => {
            this.groceryList.unshift(groceryObject);
            this.grocery = "";
            },
            () => {
            alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
            this.grocery = "";
            }
        )
    }

    delete(grocery: Grocery) {
      this.groceryListService.delete(grocery.id)
        .subscribe(() => {
          // Running the array splice in a zone ensures that change detection gets triggered.
          this.zone.run(() => {
            let index = this.groceryList.indexOf(grocery);
            this.groceryList.splice(index, 1);
          });
      });
    }

    toggleFlashlight() {
        console.log("Flasglight toogle function");
        if (flashlight.isAvailable()) {
          flashlight.toggle({
            intensity: 0.6 // optional, supported on iOS only (default: 1.0 which is 100% brightness)
          });
          console.log("Flasglight toogle");
        } else {
          alert("A flashlight is not available on your device.");
        }
      };

    openSensors() {
        this.router.navigate(["/sensors"]);
    }

    openCamera() {
        this.router.navigate(["/camera"]);
    }

    openList() {
        this.router.navigate(["/list"]);
    }

    share() {
      let listString = this.groceryList
        .map(grocery => grocery.name)
        .join(", ")
        .trim();
      SocialShare.shareText(listString);
    }
}