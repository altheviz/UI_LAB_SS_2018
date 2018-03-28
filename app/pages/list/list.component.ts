// Angular imports
import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";

// NativeScript imports
import { TextField } from "ui/text-field";
import * as SocialShare from "nativescript-social-share";

// App imports
import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";

@Component({
    selector: "list",
    moduleId: module.id,
    templateUrl: "./list.html",
    styleUrls: ["./list-common.css", "./list.css"],
    providers: [GroceryListService]
})

export class ListComponent implements OnInit {

    groceryList: Array<Grocery> = [];
    grocery = "";
    searchImage = "";
    isLoading = true;
    listLoaded = false;

    @ViewChild("groceryTextField") groceryTextField: ElementRef;

    constructor(private groceryListService: GroceryListService, private zone: NgZone) { }

    ngOnInit() {
        this.isLoading = true;
        this.groceryListService.load()
            .subscribe(loadedGroceries => {
                loadedGroceries.forEach((groceryObject) => {
                    this.groceryList.unshift(groceryObject);
                    this.loadSearchImage(groceryObject);
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
                    this.loadSearchImage(groceryObject);
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

    share() {
        let listString = "Ich bin shoppingsüchtig und muss folgede Dinge unbedingt haben: "
            + this.groceryList
                .map(grocery => grocery.name)
                .join(" und ")
                .trim();
        SocialShare.shareText(listString);
    }

    loadSearchImage(grocery: Grocery) {
        this.groceryListService.loadImage(grocery.name).subscribe(imageUrl => {
                grocery.imageSrc = imageUrl;
            },
            () => {
                alert({
                    message: "An error occurred while searching an image for your item.",
                    okButtonText: "OK"
                });
            }
        )  
    }
}
