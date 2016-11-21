"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = require("./myLib/d3Wtip");
var _ = require("lodash-es");
var visTemplate_1 = require("./myLib/visTemplate");
var Subject_1 = require('rxjs/Subject');
// Chart that displays series fo data that have "periods" (e.g.201531) for the x Axis (ordinal scale) and a lineal scale for the y axis
var vis_groupper = (function (_super) {
    __extends(vis_groupper, _super);
    function vis_groupper(element) {
        var _this = this;
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
            var browserTopMargin = 112 + 110; // Nav bars on top or chart + legends
            myself._width = element.getBoundingClientRect().width - myself._margin.left - myself._margin.right;
            myself._height = browserHeight - browserTopMargin - myself._margin.top - myself._margin.bottom;
            myself._width = d3.min([myself._width, myself._height]);
            myself._height = d3.min([myself._width, myself._height]);
            //height = width*heightWidthRatio//
            myself._svgMainContainer.attr("width", myself._width + myself._margin.left + myself._margin.right);
            myself._svgMainContainer.attr("height", myself._height + myself._margin.top + myself._margin.bottom);
            myself._svgContainer
                .attr("transform", "translate(" + myself._margin.left + "," + myself._margin.top + ")");
            /* following code was for modal windows
            var modalMargin = 150;
            var browserWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
      
            var browserHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
      
            myself._width = browserWidth - myself._margin.left-myself._margin.right;
            myself._height = browserHeight - myself._margin.left-myself._margin.right - modalMargin;
      
            if (myself._width < myself._height) {myself._height = myself._width} else {myself._width = myself._height};
      
            myself._svgMainContainer.attr("width", myself._width+myself._margin.left+myself._margin.right)
            myself._svgMainContainer.attr("height",myself._height+myself._margin.top+myself._margin.bottom)
            myself._svgContainer
                .attr("transform", "translate(" + myself._margin.left + "," + myself._margin.top+ ")");
                */
        };
        this._margin.right = 0;
        this._margin.left = 0;
        this._margin.top = 0;
        this._margin.bottom = 0;
        this.resizeSvg = resizeSvg;
        resizeSvg();
        this._svgContainer
            .classed("categoryGroupper", true);
        this.tip = d3.tip().attr('class', 'd3-tip groupper').html(function (d) { return d.data.department ? d.data.department + (d.data.category ? " | " + d.data.category : "") : ""; });
        this._svgContainer.call(this.tip);
        this.deficitScale = d3.scaleLinear().range(["#ffcccc", "#FF0000"]);
        this.searcher.subscribe(function (text) {
            _this.searchText = text;
            _this.internalRender(_this.data);
        });
    }
    vis_groupper.prototype.selectCategory = function (selectedCategory) {
        this.selectedCategory = selectedCategory;
    };
    vis_groupper.prototype.processData = function (options) {
        var highlightRegExp = new RegExp(options.highlight, "i");
        var departments = options.departments;
        // Change format to departments hierarchy
        /*
          FROM:
          departments: [{categories:[{brands:[{divisions:[{}]}]}]}]
    
          TO:
          root : {children:[{children:[{}]}]}
         
         */
        _.each(departments, function (d) {
            d.children = d.categories;
            d.department = d.name;
            d.highlighted = d.name.match(highlightRegExp) && d.name.match(highlightRegExp)[0] ? true : false;
            _.each(d.categories, function (c) {
                c.department = d.name;
                c.category = c.name;
                c.children = c.brands;
                c.highlighted = c.name.match(highlightRegExp) && c.name.match(highlightRegExp)[0] ? true : false;
            });
        });
        var root = { "children": departments };
        var hierarchy = d3.hierarchy(root, function (d) { return d.children; })
            .sum(function (d) {
            if (!d.value)
                console.log(d);
            return d.value ? d.value.salesTy : 0;
        })
            .sort(function (a, b) {
            return b.value - a.value;
        });
        var pack = d3.pack();
        var nodes = pack(hierarchy).descendants();
        return nodes;
    };
    vis_groupper.prototype.render = function (options) {
        this.resizeSvg();
        var myself = this;
        // Lets get the data out of the crossfilter (cf)
        var nodes = this.processData(options);
        this.data = _.filter(nodes, function (d) { return d.depth <= 2; });
        //var expectedGrowth = options.expectedGrowth;
        var deficitValues = _.map(_.filter(this.data, function (d) { return d.data.value && +d.data.value.surplus < 0; }), function (d) { return -(+d.data.value.surplus); });
        deficitValues = _.sortBy(deficitValues, function (d) { return d; });
        this.lowerDeficitBoundary = d3.quantile(deficitValues, 0.10);
        this.higherDeficitBoundary = d3.quantile(deficitValues, 0.90);
        this.deficitScale.domain([this.lowerDeficitBoundary, this.higherDeficitBoundary]);
        if (this.data && this.data.length) {
            this.internalRender(this.data);
        }
    };
    vis_groupper.prototype.updateExpectedGrowth = function (expectedGrowth) {
        this.internalRender(this.data);
    };
    vis_groupper.prototype.internalRender = function (data) {
        var _this = this;
        var myself = this;
        var highlightRegExp = new RegExp(this.searchText, "i");
        // Exclude root & nodes with no name to avoid side effects (such as ghost nodes)
        data = data.filter(function (d) { return d.data.name; });
        var categoryBubble = this._svgContainer.selectAll(".categories")
            .data(data, function (d) { return (d.data.department ? d.data.department : "") + (d.data.category ? "|" + d.data.category : ""); });
        var diameter = d3.min([this._height, this._width]);
        categoryBubble = categoryBubble.enter()
            .append("circle")
            .classed("categories", true)
            .on("mouseover", function (d) { myself.mouseover(d, this); })
            .on("mouseout", function (d) { return _this.mouseout(d); })
            .on("click", function (d) { myself.click(d, this); })
            .merge(categoryBubble);
        categoryBubble
            .attr("r", function (d) { return d.r * diameter; })
            .attr("cx", function (d) { return d.x * diameter; })
            .attr("cy", function (d) { return d.y * diameter; })
            .classed("department", function (d) { return d.depth == 1; })
            .classed("category", function (d) { return d.depth == 2; })
            .classed("brand", function (d) { return d.depth == 3; })
            .classed("root", function (d) { return d.depth == 0; })
            .classed("highlighted", function (d) { return d.data.name.match(highlightRegExp) && d.data.name.match(highlightRegExp)[0] ? true : false; })
            .classed("selected", function (d) { return d.data.category && d.data.category == _this.selectedCategory; })
            .attr("fill", function (d) {
            if (d.data.value && d.data.value.surplus < 0) {
                if (-d.data.value.surplus < _this.lowerDeficitBoundary) {
                    return _this.deficitScale.range()[0];
                }
                else if (-d.data.value.surplus > _this.higherDeficitBoundary) {
                    return _this.deficitScale.range()[1];
                }
                else {
                    return _this.deficitScale(-d.data.value.surplus);
                }
            }
            else {
                return "lightgrey";
            }
        });
    };
    vis_groupper.prototype.check4Colisions = function (labelNode) {
        var myself = this;
        var labelrect = labelNode.getBoundingClientRect();
        this._svgContainer.select("g.bubbles").selectAll("g.bubble").select("text")
            .each(function () {
            var otherNode = this;
            if (labelNode !== otherNode) {
                if (myself.rectOverlap(labelrect, otherNode.getBoundingClientRect())) {
                    console.log(+d3.select(otherNode).attr("opacity"));
                    if (+d3.select(otherNode).attr("opacity") > 0) {
                        d3.select(labelNode).attr("opacity", 0);
                    }
                }
                ;
            }
        });
    };
    vis_groupper.prototype.rectOverlap = function (r1, r2) {
        var xNonOverlap = r1.right < r2.left || r1.left > r2.right;
        var yNonOverlap = r1.top > r2.bottom || r1.bottom < r2.top;
        return !xNonOverlap && !yNonOverlap;
    };
    // test for displaying tooltips
    vis_groupper.prototype.mouseover = function (d, el) {
        this.tip.show(d);
        var timeSinceLastClick = this.latestClickTime ? (performance.now() - this.latestClickTime) / 1000 : Infinity;
        // notify the category on mouseover unless we have recently clicked
        if (timeSinceLastClick > 1) {
            this.selectedCategory = d.data.category;
            this._notifier.next(d.data);
            this.internalRender(this.data);
            el.parentNode.appendChild(el);
        }
    };
    vis_groupper.prototype.click = function (d, el) {
        this.latestClickTime = performance.now();
        this._notifier.next(d.data);
        this.clicked.next();
        this.selectedCategory = d.data.category;
        this.internalRender(this.data);
        el.parentNode.appendChild(el);
    };
    vis_groupper.prototype.mouseout = function (d) {
        this.tip.hide(d);
    };
    return vis_groupper;
}(visTemplate_1.visTemplate));
exports.vis_groupper = vis_groupper;
//# sourceMappingURL=categoryGroupperV2.js.map