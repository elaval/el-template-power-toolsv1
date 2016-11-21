"use strict";
var division_1 = require("./division");
var _ = require("lodash-es");
var Brand = (function () {
    function Brand(options) {
        var _this = this;
        this.expectedGrowthRate = 0.05;
        this.name = options.name;
        this.expectedGrowthRate = options.expectedGrowthRate ? options.expectedGrowthRate : 0;
        var groupedData = _.groupBy(options.data, function (d) { return d.division; });
        this.divisions = _.map(groupedData, function (data, name) { return new division_1.Division({ "name": name, "data": data, "expectedGrowthRate": _this.expectedGrowthRate }); });
        var initialValue = {
            salesLy: 0,
            salesTy: 0,
            surplus: 0,
            expectedSales: 0
        };
        this.value = _.reduce(this.divisions, function (memo, d) {
            memo.salesLy += +d.value.salesLy;
            memo.salesTy += +d.value.salesTy;
            return memo;
        }, initialValue);
        this.value.expectedSales = this.value.salesLy ? this.value.salesLy * (1 + this.expectedGrowthRate) : 0;
        this.value.surplus = this.value.salesTy ? this.value.salesTy - this.value.expectedSales : 0;
        ;
        this.relevantDivisions = _.filter(this.divisions, function (d) { return d.value.surplus < 0 && d.value.surplus < _this.value.surplus / 2; });
    }
    Brand.prototype.updateGrowthRate = function (growthRate) {
        var _this = this;
        this.expectedGrowthRate = growthRate;
        this.value.expectedSales = this.value.salesLy ? this.value.salesLy * (1 + this.expectedGrowthRate) : 0;
        this.value.surplus = this.value.salesTy ? this.value.salesTy - this.value.expectedSales : 0;
        ;
        _.each(this.divisions, function (d) { return d.updateGrowthRate(growthRate); });
        this.relevantDivisions = _.filter(this.divisions, function (d) { return d.value.surplus < 0 && d.value.surplus < _this.value.surplus / 2; });
    };
    return Brand;
}());
exports.Brand = Brand;
//# sourceMappingURL=brand.js.map