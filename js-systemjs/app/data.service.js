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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var app_namespace_1 = require("./app-namespace");
var core_1 = require('@angular/core');
var DataService = (function () {
    function DataService(zone) {
        var _this = this;
        this.observer = new BehaviorSubject_1.BehaviorSubject([]);
        this.notifier = new BehaviorSubject_1.BehaviorSubject([]);
        this.categoryBeacon = new BehaviorSubject_1.BehaviorSubject(""); // Use as a bridge between thos who notify a new category and those who need to subscribe to it
        this.zone = zone;
        // Make the dataService available through global namespace (i.e. window.App)
        app_namespace_1.AppNamespace.dataService = this;
        this.selectedItemSubject = new BehaviorSubject_1.BehaviorSubject("");
        this.selectedItem = this.selectedItemSubject.asObservable();
        this.data = this.notifier.asObservable();
        // We receive data from an external feed to our observer (observer.next(data))
        this.observer.subscribe(function (data) {
            _this.zone.run(function () {
                _this.rawData = data;
                _this.notifier.next(data);
            });
        });
        this.categoryBeacon.subscribe(function (d) {
        });
    }
    DataService.prototype.selectItem = function (item) {
        this.selectedItemSubject.next(item);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map