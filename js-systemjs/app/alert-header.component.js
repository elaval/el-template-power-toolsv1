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
var core_2 = require('@angular/core');
var data_service_1 = require('./data.service');
var AlertHeaderComponent = (function () {
    function AlertHeaderComponent(dataSummaryService, zone) {
        this.dataSummaryService = dataSummaryService;
        this.zone = zone;
    }
    AlertHeaderComponent.prototype.ngOnChanges = function (changes) {
        var log = [];
        for (var propName in changes) {
            var changedProp = changes[propName];
            var from = JSON.stringify(changedProp.previousValue);
            var to = JSON.stringify(changedProp.currentValue);
            log.push(propName + " changed from " + from + " to " + to);
        }
        alert(log);
    };
    AlertHeaderComponent.prototype.selectCategory = function () {
    };
    AlertHeaderComponent.prototype.onChange = function (newValue) {
    };
    AlertHeaderComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Number)
    ], AlertHeaderComponent.prototype, "expectedGrowthRate100", void 0);
    AlertHeaderComponent = __decorate([
        core_1.Component({
            selector: 'alert-header',
            templateUrl: "./templates/alert-header.html"
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, core_1.NgZone])
    ], AlertHeaderComponent);
    return AlertHeaderComponent;
}());
exports.AlertHeaderComponent = AlertHeaderComponent;
//# sourceMappingURL=alert-header.component.js.map