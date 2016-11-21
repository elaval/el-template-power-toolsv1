"use strict";
var category_1 = require("./category");
var _ = require("lodash-es");
var Department = (function () {
    function Department(options) {
        var _this = this;
        this.name = options.name;
        this.expectedGrowthRate = options.expectedGrowthRate ? options.expectedGrowthRate : 0;
        var groupedData = _.groupBy(options.data, function (d) { return d.category; });
        this.categories = _.map(groupedData, function (data, name) { return new category_1.Category({ "name": name, "data": data, "expectedGrowthRate": _this.expectedGrowthRate }); });
        _.each(this.categories, function (category) { return category.department = _this; });
        var initialValue = {
            salesLy: 0,
            salesTy: 0,
            surplus: 0,
            expectedSales: 0
        };
        this.value = _.reduce(this.categories, function (memo, d) {
            memo.salesLy += +d.value.salesLy;
            memo.salesTy += +d.value.salesTy;
            return memo;
        }, initialValue);
        this.value.expectedSales = this.value.salesLy ? this.value.salesLy * (1 + this.expectedGrowthRate) : 0;
        this.value.surplus = this.value.salesTy ? this.value.salesTy - this.value.expectedSales : 0;
        ;
    }
    Department.prototype.updateExpectedGrowthRate = function (growthRate) {
        this.expectedGrowthRate = growthRate;
        this.value.expectedSales = this.value.salesLy ? this.value.salesLy * (1 + this.expectedGrowthRate) : 0;
        this.value.surplus = this.value.salesTy ? this.value.salesTy - this.value.expectedSales : 0;
        ;
        _.each(this.categories, function (c) { return c.updateGrowthRate(growthRate); });
    };
    return Department;
}());
exports.Department = Department;
//# sourceMappingURL=department.js.map