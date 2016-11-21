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
var app_namespace_1 = require("./app-namespace");
var RX = require('rxjs-es');
var core_1 = require('@angular/core');
var _ = require("lodash-es");
var department_1 = require("./hierarchy/department");
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
        this.observer = new RX.Subject();
        this.notifier = new RX.Subject();
        this.categoryBeacon = new RX.Subject(); // Use as a bridge between thos who notify a new category and those who need to subscribe to it
        this.growthRateObserver = new RX.Subject(); // Update growth rate
        this.deficitDepartmentsNotifier = new RX.Subject();
        this.expectedGrowthRate = 0.05;
        app_namespace_1.AppNamespace.alertDataService = this;
        // We receive data from an external feed to our observer (observer.next(data))
        this.observer.subscribe(function (data) {
            // Change department & category names (AH)-MEAT => MEAT
            _.each(data, function (d) {
                d.department = d.department.replace(/^\(AH\)-/, '');
                d.category = d.category.replace(/^\(AH\)-/, '');
            });
            _this.rawData = data;
            // Build a crossfilter for future data management
            // this.crossfilterSetup(data);
            // Create a summary with metrics en each hierarchy level (Department, Category, Brand, Division)
            _this.sumariseData();
            _this.categoryBeacon.subscribe(function (d) { return _this.selectedCategory = d; });
        });
        this.growthRateObserver.subscribe(function (rate) {
            _this.expectedGrowthRate = rate;
            _.each(_this.summaryInfo.departments, function (d) { return d.updateExpectedGrowthRate(rate); });
            _this.highDeficitCategories = _this.getHighDeficitCategories();
            _this.deficitDepartmentsNotifier.next(_this.highDeficitCategories);
        });
    }
    DataSummaryService.prototype.sumariseData = function () {
        this.summaryInfo = this.hierarchiseDepartments(); // {"departments": departments, "categoryDict": categoryDict}
        this.highDeficitCategories = this.getHighDeficitCategories();
        this.notifier.next(this.summaryInfo);
        this.deficitDepartmentsNotifier.next(this.highDeficitCategories);
    };
    DataSummaryService.prototype.hierarchiseDepartments = function () {
        var _this = this;
        var groupData = _.groupBy(this.rawData, function (d) { return d.department; });
        var departments = _.map(groupData, function (data, name) { return new department_1.Department({ "name": name, "data": data, "expectedGrowthRate": _this.expectedGrowthRate }); });
        var categoryDict = {};
        _.each(departments, function (department) {
            _.each(department.categories, function (category) {
                if (category[category.name])
                    console.log("REPEATED CATEGORY NAME", category.name);
                categoryDict[category.name] = category;
            });
        });
        return { "departments": departments, "categoryDict": categoryDict, "expectedGrowthRate": this.expectedGrowthRate };
    };
    DataSummaryService.prototype.getHighDeficitCategories = function () {
        var categories = _.values(this.summaryInfo.categoryDict);
        var bottomCategories = _.take(_.sortBy(categories, function (d) { return d.value.surplus; }), 50);
        return bottomCategories;
    };
    DataSummaryService.prototype.group = function (type) {
        return this.groups[type];
    };
    DataSummaryService.prototype.addFilter = function (filterDef) {
        var dim = filterDef.category;
        var value = filterDef.value;
        this.dimensions[dim].filterExact(value);
    };
    DataSummaryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataSummaryService);
    return DataSummaryService;
}());
exports.DataSummaryService = DataSummaryService;
//# sourceMappingURL=data-summary.service - Copy.js.map