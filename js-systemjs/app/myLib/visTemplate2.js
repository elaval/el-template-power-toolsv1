"use strict";
var d3 = require("d3");
var visTemplate = (function () {
    // = d3.axisLeft(this._yScale).tickFormat(this._yFormat);
    function visTemplate() {
        this._yScale = d3.scaleLinear();
        //this._yAxis = d3.axisLeft(this._yScale);
    }
    return visTemplate;
}());
exports.visTemplate = visTemplate;
//# sourceMappingURL=visTemplate2.js.map