"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
var router_1 = require("@angular/router");
var SocialShare = require("nativescript-social-share");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var flashlight = require("nativescript-flashlight");
var ListComponent = /** @class */ (function () {
    function ListComponent(groceryListService, zone, router) {
        this.groceryListService = groceryListService;
        this.zone = zone;
        this.router = router;
        this.groceryList = [];
        this.saveToGallery = true;
        this.grocery = "";
        this.isLoading = true;
        this.listLoaded = false;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.groceryListService.load()
            .subscribe(function (loadedGroceries) {
            loadedGroceries.forEach(function (groceryObject) {
                _this.groceryList.unshift(groceryObject);
            });
            _this.isLoading = false;
            _this.listLoaded = true;
        });
    };
    ListComponent.prototype.add = function () {
        var _this = this;
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }
        // Dismiss the keyboard
        var textField = this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
        this.groceryListService.add(this.grocery)
            .subscribe(function (groceryObject) {
            _this.groceryList.unshift(groceryObject);
            _this.grocery = "";
        }, function () {
            alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
            _this.grocery = "";
        });
    };
    ListComponent.prototype.delete = function (grocery) {
        var _this = this;
        this.groceryListService.delete(grocery.id)
            .subscribe(function () {
            // Running the array splice in a zone ensures that change detection gets triggered.
            _this.zone.run(function () {
                var index = _this.groceryList.indexOf(grocery);
                _this.groceryList.splice(index, 1);
            });
        });
    };
    ListComponent.prototype.toggleFlashlight = function () {
        console.log("Flasglight toogle function");
        if (flashlight.isAvailable()) {
            flashlight.toggle({
                intensity: 0.6 // optional, supported on iOS only (default: 1.0 which is 100% brightness)
            });
            console.log("Flasglight toogle");
        }
        else {
            alert("A flashlight is not available on your device.");
        }
    };
    ;
    ListComponent.prototype.openSensors = function () {
        this.router.navigate(["/sensors"]);
    };
    ListComponent.prototype.openCamera = function () {
        this.router.navigate(["/camera"]);
    };
    ListComponent.prototype.openList = function () {
        this.router.navigate(["/list"]);
    };
    ListComponent.prototype.share = function () {
        var listString = this.groceryList
            .map(function (grocery) { return grocery.name; })
            .join(", ")
            .trim();
        SocialShare.shareText(listString);
    };
    __decorate([
        core_1.ViewChild("groceryTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "groceryTextField", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: "list",
            moduleId: module.id,
            templateUrl: "./list.html",
            styleUrls: ["./list-common.css", "./list.css"],
            providers: [grocery_list_service_1.GroceryListService]
        }),
        __metadata("design:paramtypes", [grocery_list_service_1.GroceryListService, core_1.NgZone, router_1.Router])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRjtBQUdqRixrRkFBK0U7QUFHL0UsMENBQXlDO0FBRXpDLHVEQUF5RDtBQUV6RCxzQ0FBd0M7QUFDeEMsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBUXRDLG9EQUFzRDtBQVN0RDtJQVdJLHVCQUFvQixrQkFBc0MsRUFBVSxJQUFZLEVBQVUsTUFBYztRQUFwRix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFWeEcsZ0JBQVcsR0FBbUIsRUFBRSxDQUFDO1FBRTFCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBR3JDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFHd0YsQ0FBQztJQUU1RyxnQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFO2FBQzNCLFNBQVMsQ0FBQyxVQUFBLGVBQWU7WUFDeEIsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLGFBQWE7Z0JBQ3BDLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkJBQUcsR0FBSDtRQUFBLGlCQXdCQztRQXZCRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENB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QUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsU0FBUyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO1lBQzlDLFNBQVMsRUFBRSxDQUFDLHlDQUFrQixDQUFDO1NBQ2hDLENBQUM7eUNBWTBDLHlDQUFrQixFQUFnQixhQUFNLEVBQWtCLGVBQU07T0FYL0YsYUFBYSxDQTZGekI7SUFBRCxvQkFBQztDQUFBLEFBN0ZELElBNkZDO0FBN0ZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBOZ1pvbmUsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IEdyb2NlcnkgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dyb2NlcnkvZ3JvY2VyeVwiO1xyXG5pbXBvcnQgeyBHcm9jZXJ5TGlzdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dyb2NlcnkvZ3JvY2VyeS1saXN0LnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCAqIGFzIFNvY2lhbFNoYXJlIGZyb20gXCJuYXRpdmVzY3JpcHQtc29jaWFsLXNoYXJlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBmcmFtZU1vZHVsZSBmcm9tIFwidWkvZnJhbWVcIjtcclxuY29uc3QgdG9wbW9zdCA9IGZyYW1lTW9kdWxlLnRvcG1vc3QoKTtcclxuXHJcbmltcG9ydCB7IHRha2VQaWN0dXJlLCByZXF1ZXN0UGVybWlzc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtY2FtZXJhJztcclxuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZSc7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0JztcclxuaW1wb3J0IHsgbGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91dGlscy91dGlscyc7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxuaW1wb3J0ICogYXMgZmxhc2hsaWdodCBmcm9tIFwibmF0aXZlc2NyaXB0LWZsYXNobGlnaHRcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImxpc3RcIixcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vbGlzdC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCIuL2xpc3QtY29tbW9uLmNzc1wiLCBcIi4vbGlzdC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbR3JvY2VyeUxpc3RTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBncm9jZXJ5TGlzdDogQXJyYXk8R3JvY2VyeT4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc2F2ZVRvR2FsbGVyeTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgY2FtZXJhSW1hZ2U6IEltYWdlQXNzZXQ7XHJcblxyXG4gICAgZ3JvY2VyeSA9IFwiXCI7XHJcbiAgICBpc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xyXG4gICAgQFZpZXdDaGlsZChcImdyb2NlcnlUZXh0RmllbGRcIikgZ3JvY2VyeVRleHRGaWVsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb2NlcnlMaXN0U2VydmljZTogR3JvY2VyeUxpc3RTZXJ2aWNlLCBwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UubG9hZCgpXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKGxvYWRlZEdyb2NlcmllcyA9PiB7XHJcbiAgICAgICAgICAgIGxvYWRlZEdyb2Nlcmllcy5mb3JFYWNoKChncm9jZXJ5T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnlPYmplY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JvY2VyeS50cmltKCkgPT09IFwiXCIpIHtcclxuICAgICAgICAgIGFsZXJ0KFwiRW50ZXIgYSBncm9jZXJ5IGl0ZW1cIik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICAvLyBEaXNtaXNzIHRoZSBrZXlib2FyZFxyXG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuZ3JvY2VyeVRleHRGaWVsZC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XHJcbiAgICAgIFxyXG4gICAgICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmFkZCh0aGlzLmdyb2NlcnkpXHJcbiAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZ3JvY2VyeU9iamVjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3QudW5zaGlmdChncm9jZXJ5T2JqZWN0KTtcclxuICAgICAgICAgICAgdGhpcy5ncm9jZXJ5ID0gXCJcIjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydCh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyBhbiBpdGVtIHRvIHlvdXIgbGlzdC5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdyb2NlcnkgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShncm9jZXJ5OiBHcm9jZXJ5KSB7XHJcbiAgICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmRlbGV0ZShncm9jZXJ5LmlkKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgLy8gUnVubmluZyB0aGUgYXJyYXkgc3BsaWNlIGluIGEgem9uZSBlbnN1cmVzIHRoYXQgY2hhbmdlIGRldGVjdGlvbiBnZXRzIHRyaWdnZXJlZC5cclxuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdyb2NlcnlMaXN0LmluZGV4T2YoZ3JvY2VyeSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVGbGFzaGxpZ2h0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmxhc2dsaWdodCB0b29nbGUgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgaWYgKGZsYXNobGlnaHQuaXNBdmFpbGFibGUoKSkge1xyXG4gICAgICAgICAgZmxhc2hsaWdodC50b2dnbGUoe1xyXG4gICAgICAgICAgICBpbnRlbnNpdHk6IDAuNiAvLyBvcHRpb25hbCwgc3VwcG9ydGVkIG9uIGlPUyBvbmx5IChkZWZhdWx0OiAxLjAgd2hpY2ggaXMgMTAwJSBicmlnaHRuZXNzKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkZsYXNnbGlnaHQgdG9vZ2xlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGVydChcIkEgZmxhc2hsaWdodCBpcyBub3QgYXZhaWxhYmxlIG9uIHlvdXIgZGV2aWNlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgb3BlblNlbnNvcnMoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlbnNvcnNcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5DYW1lcmEoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2NhbWVyYVwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3Blbkxpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xpc3RcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNoYXJlKCkge1xyXG4gICAgICBsZXQgbGlzdFN0cmluZyA9IHRoaXMuZ3JvY2VyeUxpc3RcclxuICAgICAgICAubWFwKGdyb2NlcnkgPT4gZ3JvY2VyeS5uYW1lKVxyXG4gICAgICAgIC5qb2luKFwiLCBcIilcclxuICAgICAgICAudHJpbSgpO1xyXG4gICAgICBTb2NpYWxTaGFyZS5zaGFyZVRleHQobGlzdFN0cmluZyk7XHJcbiAgICB9XHJcbn0iXX0=