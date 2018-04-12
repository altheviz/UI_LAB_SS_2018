"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_camera_1 = require("nativescript-camera");
var image_source_1 = require("tns-core-modules/image-source");
var utils_1 = require("tns-core-modules/utils/utils");
var app = require("tns-core-modules/application");
var CameraComponent = /** @class */ (function () {
    function CameraComponent(router) {
        this.router = router;
        this.saveToGallery = true;
    }
    CameraComponent.prototype.openSensors = function () {
        this.router.navigate(["/sensors"]);
    };
    CameraComponent.prototype.openCamera = function () {
        this.router.navigate(["/camera"]);
    };
    CameraComponent.prototype.openList = function () {
        this.router.navigate(["/list"]);
    };
    CameraComponent.prototype.onTakePictureTap = function (args) {
        var _this = this;
        nativescript_camera_1.requestPermissions().then(function () {
            nativescript_camera_1.takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: _this.saveToGallery })
                .then(function (imageAsset) {
                _this.cameraImage = imageAsset;
                // if you need image source
                var source = new image_source_1.ImageSource();
                source.fromAsset(imageAsset).then(function (source) {
                    var width = source.width;
                    var height = source.height;
                    if (app.android) {
                        // the android dimensions are in device pixels
                        width = utils_1.layout.toDeviceIndependentPixels(width);
                        height = utils_1.layout.toDeviceIndependentPixels(height);
                    }
                    console.log("Size: " + width + "x" + height);
                });
            }, function (error) {
                console.log("Error: " + error);
            });
        }, function () { return alert('permissions rejected'); });
    };
    CameraComponent = __decorate([
        core_1.Component({
            selector: "camera",
            moduleId: module.id,
            templateUrl: "./camera.html",
            styleUrls: ["./camera-common.css", "./camera.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CameraComponent);
    return CameraComponent;
}());
exports.CameraComponent = CameraComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZXJhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbWVyYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFFMUMsMENBQXlDO0FBRXpDLDJEQUFzRTtBQUN0RSw4REFBNEQ7QUFFNUQsc0RBQXNEO0FBQ3RELGtEQUFvRDtBQVFwRDtJQUtFLHlCQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUgzQixrQkFBYSxHQUFZLElBQUksQ0FBQztJQUdBLENBQUM7SUFFeEMscUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsb0NBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUMsMENBQWdCLEdBQWhCLFVBQWlCLElBQUk7UUFBckIsaUJBMEJEO1FBekJHLHdDQUFrQixFQUFFLENBQUMsSUFBSSxDQUNyQjtZQUNJLGlDQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUM3RixJQUFJLENBQUMsVUFBQyxVQUFlO2dCQUNsQixLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFFOUIsMkJBQTJCO2dCQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO29CQUNyQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUN6QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUMzQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDZCw4Q0FBOEM7d0JBQzlDLEtBQUssR0FBRyxjQUFNLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2hELE1BQU0sR0FBRyxjQUFNLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3RELENBQUM7b0JBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFTLEtBQUssU0FBSSxNQUFRLENBQUMsQ0FBQztnQkFDNUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLEVBQUUsVUFBQyxLQUFLO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxFQUNELGNBQU0sT0FBQSxLQUFLLENBQUMsc0JBQXNCLENBQUMsRUFBN0IsQ0FBNkIsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUE3Q1ksZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxlQUFlO1lBQzVCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsQ0FBQztTQUNuRCxDQUFDO3lDQU00QixlQUFNO09BTHZCLGVBQWUsQ0ErQzNCO0lBQUQsc0JBQUM7Q0FBQSxBQS9DRCxJQStDQztBQS9DWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyB0YWtlUGljdHVyZSwgcmVxdWVzdFBlcm1pc3Npb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNhbWVyYSc7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2UnO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldCc7XHJcbmltcG9ydCB7IGxheW91dCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImNhbWVyYVwiLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9jYW1lcmEuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi9jYW1lcmEtY29tbW9uLmNzc1wiLCBcIi4vY2FtZXJhLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhQ29tcG9uZW50IHtcclxuXHJcbiAgcHVibGljIHNhdmVUb0dhbGxlcnk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBjYW1lcmFJbWFnZTogSW1hZ2VBc3NldDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cclxuXHJcbm9wZW5TZW5zb3JzKCkge1xyXG4gIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZW5zb3JzXCJdKTtcclxufVxyXG5cclxub3BlbkNhbWVyYSgpIHtcclxuICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvY2FtZXJhXCJdKTtcclxufVxyXG5cclxub3Blbkxpc3QoKSB7XHJcbiAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xpc3RcIl0pO1xyXG59XHJcblxyXG4gIG9uVGFrZVBpY3R1cmVUYXAoYXJncykge1xyXG4gICAgcmVxdWVzdFBlcm1pc3Npb25zKCkudGhlbihcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRha2VQaWN0dXJlKHsgd2lkdGg6IDMwMCwgaGVpZ2h0OiAzMDAsIGtlZXBBc3BlY3RSYXRpbzogdHJ1ZSwgc2F2ZVRvR2FsbGVyeTogdGhpcy5zYXZlVG9HYWxsZXJ5IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoaW1hZ2VBc3NldDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW1lcmFJbWFnZSA9IGltYWdlQXNzZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHlvdSBuZWVkIGltYWdlIHNvdXJjZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBuZXcgSW1hZ2VTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4oKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkdGggPSBzb3VyY2Uud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSBzb3VyY2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhbmRyb2lkIGRpbWVuc2lvbnMgYXJlIGluIGRldmljZSBwaXhlbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gbGF5b3V0LnRvRGV2aWNlSW5kZXBlbmRlbnRQaXhlbHMod2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gbGF5b3V0LnRvRGV2aWNlSW5kZXBlbmRlbnRQaXhlbHMoaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNpemU6ICR7d2lkdGh9eCR7aGVpZ2h0fWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IGFsZXJ0KCdwZXJtaXNzaW9ucyByZWplY3RlZCcpXHJcbiAgICApO1xyXG59XHJcblxyXG59Il19