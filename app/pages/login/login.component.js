"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable = require("data/observable");
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent() {
        //this.page.bindingContext = { myItems: [{ name: "Name1" }, { name: "Name2" }, { name: "Name3" }] };
    }
    LoginComponent.prototype.onLoaded = function (args) {
        console.log("onLoaded");
        this.page = args.object;
        this.page.bindingContext = observable.fromObject({
            selectedIndex: 0
        });
        this.selectedIndexChanged(null);
    };
    LoginComponent.prototype.selectedIndexChanged = function (args) {
        if (this.page !== undefined) {
            var tabView = this.page.getViewById("tabView");
            var index = tabView.selectedIndex;
            console.log(index);
            var names = ["btn-red", "btn-yellow", "btn-blue", "btn-lightblue", "btn-lightgreen"];
            for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                var name_1 = names_1[_i];
                console.log(name_1);
                var view_1 = this.page.getViewById("" + index + name_1);
                if (view_1 !== undefined) {
                    view_1.className = name_1;
                    view_1.className = name_1 + "-animated";
                }
            }
        }
    };
    LoginComponent.prototype.buttonTap = function (args) {
        console.log("buttonTap");
        var button = args.object;
        var className = button.className.replace("-animated", "").replace("2", "");
        button.className = className;
        button.className = className + "-animated2";
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "./pages/login/login.html",
            styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
        })
        //let page: Page;
        ,
        __metadata("design:paramtypes", [])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQStDO0FBSS9DLHNDQUF5RTtBQXFCekU7SUFJSTtRQUNJLG9HQUFvRztJQUN4RyxDQUFDO0lBR0QsaUNBQVEsR0FBUixVQUFTLElBQTBCO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDN0MsYUFBYSxFQUFFLENBQUM7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCw2Q0FBb0IsR0FBcEIsVUFBcUIsSUFBSTtRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQXdCLFNBQVMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNsQixJQUFJLEtBQUssR0FBRyxDQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBRSxDQUFDO1lBQ3ZGLEdBQUcsQ0FBQyxDQUFhLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLO2dCQUFqQixJQUFJLE1BQUksY0FBQTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQUksQ0FBQyxDQUFBO2dCQUVqQixJQUFJLE1BQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBTyxFQUFFLEdBQUcsS0FBSyxHQUFHLE1BQUksQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxNQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDckIsTUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFJLENBQUM7b0JBQ3RCLE1BQUksQ0FBQyxTQUFTLEdBQUcsTUFBSSxHQUFHLFdBQVcsQ0FBQztnQkFDeEMsQ0FBQzthQUNKO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFHRCxrQ0FBUyxHQUFULFVBQVUsSUFBMEI7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN4QixJQUFJLE1BQU0sR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUNwRCxDQUFDO0lBM0NZLGNBQWM7UUFUMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBRWxCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLEVBQUUseUJBQXlCLENBQUM7U0FDekUsQ0FBQztRQUVGLGlCQUFpQjs7O09BRU4sY0FBYyxDQTZDMUI7SUFBRCxxQkFBQztDQUFBLEFBN0NELElBNkNDO0FBN0NZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ic2VydmFibGUgPSByZXF1aXJlKFwiZGF0YS9vYnNlcnZhYmxlXCIpO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHZpZXcgPSByZXF1aXJlKFwidWkvY29yZS92aWV3XCIpO1xyXG5pbXBvcnQgbGlzdFZpZXcgPSByZXF1aXJlKFwidWkvbGlzdC12aWV3XCIpO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IGxhYmVsID0gcmVxdWlyZShcInVpL2xhYmVsXCIpO1xyXG5cclxuXHJcbmltcG9ydCAqIGFzIGdyaWRNb2R1bGUgZnJvbSBcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiY29sb3JcIjtcclxuXHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCAqIGFzIHRhYlZpZXdNb2R1bGUgZnJvbSBcInVpL3RhYi12aWV3XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxyXG4gICAgXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9wYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5jc3NcIl1cclxuICB9KVxyXG5cclxuICAvL2xldCBwYWdlOiBQYWdlO1xyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IHtcclxuICAgIC8vbXlJdGVtczogU3RyaW5nW107XHJcbiAgICBwYWdlOiBQYWdlXHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIC8vdGhpcy5wYWdlLmJpbmRpbmdDb250ZXh0ID0geyBteUl0ZW1zOiBbeyBuYW1lOiBcIk5hbWUxXCIgfSwgeyBuYW1lOiBcIk5hbWUyXCIgfSwgeyBuYW1lOiBcIk5hbWUzXCIgfV0gfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkZWQoYXJnczogb2JzZXJ2YWJsZS5FdmVudERhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uTG9hZGVkXCIpXHJcbiAgICAgICAgdGhpcy5wYWdlID0gPFBhZ2U+YXJncy5vYmplY3RcclxuICAgICAgICB0aGlzLnBhZ2UuYmluZGluZ0NvbnRleHQgPSBvYnNlcnZhYmxlLmZyb21PYmplY3Qoe1xyXG4gICAgICAgICAgICBzZWxlY3RlZEluZGV4OiAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlZChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGxldCB0YWJWaWV3ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPHRhYlZpZXdNb2R1bGUuVGFiVmlldz4oXCJ0YWJWaWV3XCIpO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0YWJWaWV3LnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxyXG4gICAgICAgICAgICBsZXQgbmFtZXMgPSBbIFwiYnRuLXJlZFwiLCBcImJ0bi15ZWxsb3dcIiwgXCJidG4tYmx1ZVwiLCBcImJ0bi1saWdodGJsdWVcIiwgXCJidG4tbGlnaHRncmVlblwiIF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5hbWUgb2YgbmFtZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5hbWUpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPFZpZXc+KFwiXCIgKyBpbmRleCArIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXcgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcuY2xhc3NOYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LmNsYXNzTmFtZSA9IG5hbWUgKyBcIi1hbmltYXRlZFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBidXR0b25UYXAoYXJnczogb2JzZXJ2YWJsZS5FdmVudERhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJ1dHRvblRhcFwiKVxyXG4gICAgICAgIGxldCBidXR0b24gPSA8Vmlldz5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgY2xhc3NOYW1lID0gYnV0dG9uLmNsYXNzTmFtZS5yZXBsYWNlKFwiLWFuaW1hdGVkXCIsIFwiXCIpLnJlcGxhY2UoXCIyXCIsIFwiXCIpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSArIFwiLWFuaW1hdGVkMlwiO1xyXG59XHJcblxyXG59Il19