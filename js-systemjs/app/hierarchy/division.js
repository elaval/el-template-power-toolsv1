"use strict";
var _ = require("lodash-es");
var Division = (function () {
    function Division(options) {
        this.expectedGrowthRate = 0.05;
        this.name = options.name;
        this.expectedGrowthRate = options.expectedGrowthRate ? options.expectedGrowthRate : 0;
        this.data = options.data;
        var initialValue = {
            salesLy: 0,
            salesTy: 0,
            surplus: 0,
            expectedSales: 0
        };
        this.value = _.reduce(this.data, function (memo, d) {
            memo.salesLy += +d.sales_ly;
            memo.salesTy += +d.sales_ty;
            return memo;
        }, initialValue);
        this.value.expectedSales = this.value.salesLy ? this.value.salesLy * (1 + this.expectedGrowthRate) : 0;
        this.value.surplus = this.value.salesTy ? this.value.salesTy - this.value.expectedSales : 0;
        ;
    }
    Division.prototype.updateGrowthRate = function (growthRate) {
        this.expectedGrowthRate = growthRate;
        this.value.expectedSales = this.value.salesLy ? this.value.salesLy * (1 + this.expectedGrowthRate) : 0;
        this.value.surplus = this.value.salesTy ? this.value.salesTy - this.value.expectedSales : 0;
        ;
    };
    return Division;
}());
exports.Division = Division;
//# sourceMappingURL=division.js.map