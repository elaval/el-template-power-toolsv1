"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var categoryGroupperV2_1 = require("./categoryGroupperV2");
var data_service_1 = require("./data.service");
var d3 = require("d3");
var MyModalComponent = (function () {
    function MyModalComponent(elementRef, dataService) {
        this.elementRef = elementRef;
        this.dataService = dataService;
        this.myDepartments = null;
        this.expectedGrowthRate100 = dataService.expectedGrowthRate * 100;
    }
    MyModalComponent.prototype.show = function () {
        var el = this.elementRef.nativeElement;
        el.querySelector(".modal").style.display = "inline-block";
    };
    MyModalComponent.prototype.hide = function () {
        var el = this.elementRef.nativeElement;
        el.querySelector(".modal").style.display = "none";
    };
    MyModalComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        var el = this.elementRef.nativeElement;
        var chartElement = el.querySelector("div#chart");
        this.vis = new categoryGroupperV2_1.vis_groupper(chartElement);
        d3.selectAll(".d3-tip.groupper").style("z-index", 999999);
        this.vis._notifier.subscribe(function (d) {
            if (d.category)
                _this.dataService.categoryBeacon.next(d.category);
        });
        /*
        this.dataService.growthRateObserver.subscribe(() => this.vis.observer.next({"departments" : this.myDepartments}));
        */
        this.dataService.deficitDepartmentsNotifier.subscribe(function (d) { return _this.vis.observer.next({ "departments": _this.myDepartments }); });
        this.vis.clicked.subscribe(function () { return _this.hide(); });
        if (this.myDepartments)
            this.vis.observer.next({ "departments": this.myDepartments });
    };
    MyModalComponent.prototype.ngOnChanges = function (changes) {
        if (this.vis)
            this.vis.observer.next({ "departments": this.myDepartments });
    };
    MyModalComponent.prototype.onChange = function (newValue) {
        this.expectedGrowthRate100 = newValue;
        this.dataService.growthRateObserver.next(this.expectedGrowthRate100 / 100);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MyModalComponent.prototype, "myDepartments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MyModalComponent.prototype, "expectedGrowthRate100", void 0);
    MyModalComponent = __decorate([
        core_1.Component({
            selector: 'my-modal',
            templateUrl: './templates/my-modal.html',
            styles: ["\n    /* The Modal (background) */\n  .modal {\n      display: none; /* Hidden by default */\n      position: fixed; /* Stay in place */\n      z-index: 1; /* Sit on top */\n      left: 0;\n      top: 0;\n      width: 100%; /* Full width */\n      height: 100%; /* Full height */\n      overflow: auto; /* Enable scroll if needed */\n      background-color: rgb(0,0,0); /* Fallback color */\n      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n  }\n\n  /* Modal Content/Box */\n  .modal-content {\n      background-color: #fefefe;\n      margin: 1% auto; /* 15% from the top and centered */\n      padding: 20px;\n      border: 1px solid #888;\n      display: inline-block;\n      /*width: 80%;  Could be more or less, depending on screen size */\n  }\n\n  /* The Close Button */\n  .close {\n      color: #aaa;\n      float: right;\n      font-size: 28px;\n      font-weight: bold;\n  }\n\n  .close:hover,\n  .close:focus {\n      color: black;\n      text-decoration: none;\n      cursor: pointer;\n  }\n\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, data_service_1.DataService])
    ], MyModalComponent);
    return MyModalComponent;
}());
exports.MyModalComponent = MyModalComponent;
//# sourceMappingURL=my-modal.component.js.map