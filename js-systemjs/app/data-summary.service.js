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
var Subject_1 = require("rxjs/Subject");
var app_namespace_1 = require("./app-namespace");
var core_1 = require('@angular/core');
var DataSummaryService = (function () {
    function DataSummaryService() {
        var _this = this;
        this.addReduceFunctions = {
            "add": function (p, v) {
                var ty = p.sales_ty + (+v.sales_ty);
                var ly = p.sales_ly + (+v.sales_ly);
                return {
                    "sales_ty": ty,
                    "sales_ly": ly,
                    "growth": ty && ly ? (ty / ly) - 1 : 0
                };
            },
            "remove": function (p, v) {
                var ty = p.sales_ty - (+v.sales_ty);
                var ly = p.sales_ly - (+v.sales_ly);
                return {
                    "sales_ty": ty,
                    "sales_ly": ly,
                    "growth": ty && ly ? (ty / ly) - 1 : 0
                };
            },
            "initial": function () {
                return {
                    "sales_ty": 0,
                    "sales_ly": 0,
                    "growth": 0,
                };
            }
        };
        this.version = "1.0.0";
        this.observer = new Subject_1.Subject();
        this.notifier = new Subject_1.Subject();
        this.categoryBeacon = new Subject_1.Subject(); // Use as a bridge between thos who notify a new category and those who need to subscribe to it
        this.growthRateObserver = new Subject_1.Subject(); // Update growth rate
        this.deficitDepartmentsNotifier = new Subject_1.Subject();
        this.expectedGrowthRate = 0.05;
        app_namespace_1.AppNamespace.alertDataService = this;
        // We receive data from an external feed to our observer (observer.next(data))
        this.observer.subscribe(function (data) {
            _this.rawData = data;
            _this.notifier.next(data);
        });
        this.categoryBeacon.subscribe(function (d) {
            alert(d);
        });
    }
    DataSummaryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataSummaryService);
    return DataSummaryService;
}());
exports.DataSummaryService = DataSummaryService;
//# sourceMappingURL=data-summary.service.js.map