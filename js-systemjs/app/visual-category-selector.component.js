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
var VisualCategorySelectorComponent = (function () {
    function VisualCategorySelectorComponent(elementRef, dataService) {
        this.elementRef = elementRef;
        this.dataService = dataService;
        this.myDepartments = null;
    }
    VisualCategorySelectorComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        var el = this.elementRef.nativeElement;
        var chartElement = el.querySelector("div#chart");
        this.vis = new categoryGroupperV2_1.vis_groupper(chartElement);
        d3.selectAll(".d3-tip.groupper").style("z-index", 999999);
        this.vis._notifier.subscribe(function (d) {
            if (d.category)
                _this.dataService.categoryBeacon.next(d.category);
        });
        this.dataService.categoryBeacon.subscribe(function (selectedCategory) {
            _this.vis.selectCategory(selectedCategory);
        });
        if (this.myDepartments)
            this.vis.observer.next({ "departments": this.myDepartments });
    };
    VisualCategorySelectorComponent.prototype.ngOnChanges = function (changes) {
        if (changes['searchText'] && this.vis)
            this.vis.searcher.next(this.searchText);
        if (changes['myDepartments'] && this.vis)
            this.vis.observer.next({ "departments": this.myDepartments });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VisualCategorySelectorComponent.prototype, "searchText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], VisualCategorySelectorComponent.prototype, "myDepartments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VisualCategorySelectorComponent.prototype, "expectedGrowthRate100", void 0);
    VisualCategorySelectorComponent = __decorate([
        core_1.Component({
            selector: 'visual-category-selector',
            templateUrl: './templates/visual-category-selector.html',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, data_service_1.DataService])
    ], VisualCategorySelectorComponent);
    return VisualCategorySelectorComponent;
}());
exports.VisualCategorySelectorComponent = VisualCategorySelectorComponent;
//# sourceMappingURL=visual-category-selector.component.js.map