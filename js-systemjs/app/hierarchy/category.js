"use strict";
var brand_1 = require("./brand");
var _ = require("lodash-es");
var Category = (function () {
    function Category(options) {
        var _this = this;
        this.name = options.name;
        this.expectedGrowthRate = options.expectedGrowthRate ? options.expectedGrowthRate : 0;
        var groupedData = _.groupBy(options.data, function (d) { return d.brand; });
        this.brands = _.map(groupedData, function (data, name) { return new brand_1.Brand({ "name": name, "data": data, "expectedGrowthRate": _this.expectedGrowthRate }); });
        var initialValue = {
            salesLy: 0,
            salesTy: 0,
            surplus: 0,
            expectedSales: 0
        };
        this.value = _.reduce(this.brands, function (memo, d) {
            memo.salesLy += +d.value.salesLy;
            memo.salesTy += +d.value.salesTy;
            return memo;
        }, initialValue);
        this.value.expectedSales = this.value.salesLy ? this.value.salesLy * (1 + this.expectedGrowthRate) : 0;
        this.value.surplus = this.value.salesTy ? this.value.salesTy - this.value.expectedSales : 0;
        ;
    }
    Category.prototype.deficitBrands = function (percentageFromTotal) {
        var deficitBrands = _.chain(this.brands).filter(function (d) { return d.value.surplus < 0; }).sortBy(function (d) { return d.value.surplus; }).value();
        var totalDeficit = _.reduce(deficitBrands, function (memo, d) { return memo - d.value.surplus; }, 0);
        var targetDeficit = totalDeficit * percentageFromTotal;
        var accum = 0;
        var mainDeficitBrands = _.filter(deficitBrands, function (d) {
            var qualifies = accum < targetDeficit;
            accum += -d.value.surplus;
            return qualifies;
        });
        return {
            "deficitBrands": deficitBrands,
            "totalDeficit": totalDeficit,
            "mainDeficitBrands_75": mainDeficitBrands
        };
    };
    Category.prototype.updateGrowthRate = function (growthRate) {
        this.expectedGrowthRate = growthRate;
        this.value.expectedSales = this.value.salesLy ? this.value.salesLy * (1 + this.expectedGrowthRate) : 0;
        this.value.surplus = this.value.salesTy ? this.value.salesTy - this.value.expectedSales : 0;
        ;
        _.each(this.brands, function (b) { return b.updateGrowthRate(growthRate); });
    };
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map