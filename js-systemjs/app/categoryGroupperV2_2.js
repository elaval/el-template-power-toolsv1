"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = require("d3");
var visTemplate_1 = require("./myLib/visTemplate");
var Subject_1 = require('rxjs/Subject');
// Chart that displays series fo data that have "periods" (e.g.201531) for the x Axis (ordinal scale) and a lineal scale for the y axis
var vis_groupper = (function (_super) {
    __extends(vis_groupper, _super);
    function vis_groupper(element) {
        _super.call(this, element);
        var myself = this;
        // From vis we inherit the following private properties:
        // _data : keeps data that has been requested to be render
        // _container: d3 selection of the given element
        // _formatNumberMoney : d3 format $0.2s
        // _formatNumberUnits : d3 format 0.2s
        // _formatNumberPercent1d : d3 format 0.1%
        // _observer
        // _observable
        // _yAttribute
        // _xAttribute
        // _margin
        // _width
        // _height
        // _svgMainContainer
        // _scgContainer
        // _xLegendScale
        // _xScale
        // _yScale
        // _color
        // _xAxis
        // _yAxis
        // _svgContainer has the following elements
        //  g.x.axis
        //  g.y.axis 
        //  g.legends
        // We have an observable for external modules to subscribe and get updates when the user clicks on a bar
        this._notifier = new Subject_1.Subject();
        this.clicked = new Subject_1.Subject();
        this.searcher = new Subject_1.Subject();
        // Layer for data lines
        var resizeSvg = function () {
            var browserHeight = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
            var browserTopMargin = 112 + 110;
            var a = d3.select("body");
            //myself._width = d3.min([myself._width, myself._height]);
        };
    }
    return vis_groupper;
}(visTemplate_1.visTemplate));
exports.vis_groupper = vis_groupper;
//# sourceMappingURL=categoryGroupperV2_2.js.map