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
var ItemListComponent = (function () {
    function ItemListComponent(dataService, zone) {
        var _this = this;
        this.dataService = dataService;
        this.zone = zone;
        this.dataService.data.subscribe(function (data) {
            _this.names = _.chain(data).groupBy(function (d) { return d.name; }).keys().value();
        });
        this.dataService.selectedItem.subscribe(function (name) {
            _this.selectedCategory = name;
        });
    }
    ItemListComponent.prototype.onSelect = function (name) {
        this.selectedCategory = name;
        this.dataService.selectItem(name);
    };
    ItemListComponent.prototype.ngAfterViewInit = function () {
    };
    ItemListComponent.prototype.ngAfterContentInit = function () {
    };
    ItemListComponent.prototype.ngOnInit = function () {
    };
    ItemListComponent = __decorate([
        core_1.Component({
            selector: 'item-list',
            templateUrl: "./templates/item-list.html",
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, core_1.NgZone])
    ], ItemListComponent);
    return ItemListComponent;
}());
exports.ItemListComponent = ItemListComponent;
//# sourceMappingURL=item-list.component.js.map