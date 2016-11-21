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
var data_service_1 = require('./data.service');
var _ = require('lodash-es');
var DepartmentListComponent = (function () {
    function DepartmentListComponent(dataSummaryService, zone) {
        var _this = this;
        this.dataSummaryService = dataSummaryService;
        this.zone = zone;
        this.dataSummaryService.notifier.subscribe(function (data) {
            _this.zone.run(function () {
                _this.names = _.chain(data).groupBy(function (d) { return d.name; }).keys().value();
            });
        });
        this.dataSummaryService.categoryBeacon.subscribe(function (selectedCategoryName) {
            _this.selectedCategory = selectedCategoryName;
        });
    }
    DepartmentListComponent.prototype.onSelect = function (name) {
        this.selectedCategory = name;
        this.dataSummaryService.selectItem(name);
    };
    DepartmentListComponent.prototype.ngAfterViewInit = function () {
    };
    DepartmentListComponent.prototype.ngAfterContentInit = function () {
    };
    DepartmentListComponent.prototype.ngOnInit = function () {
    };
    DepartmentListComponent = __decorate([
        core_1.Component({
            selector: 'department-list',
            templateUrl: "./templates/department-list.html",
        }), 
        __metadata('design:paramtypes', [data_service_1.DataSummaryService, core_1.NgZone])
    ], DepartmentListComponent);
    return DepartmentListComponent;
}());
exports.DepartmentListComponent = DepartmentListComponent;
//# sourceMappingURL=department-list.component.js.map