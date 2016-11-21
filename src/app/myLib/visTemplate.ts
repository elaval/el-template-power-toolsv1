import { Observable } from 'rxjs/Observable';
import * as d3 from "d3";

interface Margin {
  left:number;
  right:number;
  top:number;
  bottom:number;
}


export class visTemplate {
   margin:Margin;
   _svgContainer:d3.Selection<any,any,any,any>;
   _svgMainContainer:d3.Selection<any,any,any,any>;
   _element: any;
   _data:any[];
   _container:d3.Selection<any,any,any,any>;
   _formatNumberMoney:any;
   _formatNumberUnits:any;
   _formatNumberPercent1d:any;
   _observer:any;
   _observable:Observable<any>;
   _myName:string;
   _yAttribute:string;
   _xAttribute:string;
   _yFormat:any;
   _margin:Margin;
   _width:number;
   _height:number;
   _xLegendScale:d3.ScalePoint<any>;
   _xScale:d3.ScalePoint<any>;
   _yScale:d3.ScaleLinear<any,any>
  _color:d3.ScaleOrdinal<any,any>
  resizeSvg:Function;

  _xAxis = d3.axisBottom(this._xScale)
      .ticks(10)
      .tickFormat(d3.format("d"));

  _yAxis = d3.axisLeft(this._yScale)
      .tickFormat(this._yFormat);

  constructor(element:any) {
    var myself = this;

    this._element = element;
    this._data = null;
    this._container = d3.select(element);

    this._formatNumberMoney = d3.format("$0.2s");                  
    this._formatNumberUnits = d3.format("0.2s");                  
    this._formatNumberPercent1d = d3.format("0.1%");

    this._observer = null;

    // Observable used to react to new data  
    this._observable = Observable.create((observer:any) => this._observer = observer);

    //this._observable.onError(err => console.log(err));

    // When nes data is issued, we render all components
    this._observable.subscribe(
      data => {
      this._myName = data.myName ? data.myName : this._myName;
      this._data = data;
      this.render(data);
      }, 
      err => console.log(err)
    );
    

    // Data attributes
    this._yAttribute = 'y';
    this._xAttribute = 'x';

    this._yFormat = d3.format("0.2s");

    this._margin = {left:null, right:null, top:null, bottom:null};
    this._margin.left = 100;
    this._margin.right = 20;
    this._margin.top = 20;
    this._margin.bottom = 100;
    this._width =  (element ? element.getBoundingClientRect().width: 800) - this._margin.left-this._margin.right;
    this._height = 400;

    this._svgMainContainer = d3.select(element)
      .append("svg")
      .attr("width", this._width+this._margin.left+this._margin.right)
      .attr("height", this._height+this._margin.top+this._margin.bottom)

    this._svgContainer = this._svgMainContainer
      .append("g")
      .attr("transform", "translate(" + this._margin.left + "," + this._margin.top+ ")");

    this._xLegendScale = d3.scalePoint().padding(1);
    this._xScale = d3.scalePoint().padding(1);
    this._yScale = d3.scaleLinear();
    this._color = d3.scaleOrdinal(d3.schemeCategory10);

    this._xAxis = d3.axisBottom(this._xScale)
      .ticks(10)
      .tickFormat(d3.format("d"));

    this._yAxis = d3.axisLeft(this._yScale)
      .tickFormat(this._yFormat);

    this._svgContainer.append("g")
      .attr("class", "x axis");

    this._svgContainer.append("g")
        .attr("class", "y axis");

    this._svgContainer.append("g")
      .attr("class", "legends")
      .attr("transform", "translate(" + 0 + "," + (this._height + 60)+ ")"); 

    var resizeSvg = function() { 
        myself._width = element.getBoundingClientRect().width - myself._margin.left-myself._margin.right;
        //height = width*heightWidthRatio//
        myself._svgMainContainer.attr("width", myself._width+myself._margin.left+myself._margin.right)
        myself._svgMainContainer.attr("height",myself._height+myself._margin.top+myself._margin.bottom)
        myself._svgContainer 
            .attr("transform", "translate(" + myself._margin.left + "," + myself._margin.top+ ")");
    }

    this.resizeSvg = resizeSvg

    // Handle re-rendering when the window is resized
    window.addEventListener("resize", function() {
      resizeSvg();
      myself.render(myself._data);
    }); // Add new listener to call doResize (which has the current data in its scope)

  }

  get observer() {
      return this._observer;
  }

  get svgContainer() {
    return this._svgContainer;
  }

  // sets/gets xattribute
  xAttribute(_:any):any {
    if (!arguments.length) return this._xAttribute;
    this._xAttribute = _;
    return this;
  }

  // sets/gets yattribute
  yAttribute(_:any):any {
    if (!arguments.length) return this._yAttribute;
    this._yAttribute = _;
    return this;
  }


  // sets/gets y2Label
  yFormat(_:any) {
    if (!arguments.length) return this._yFormat;
    this._yFormat = _;
    return this;
  }

  // sets/gets left margin
  marginLeft(_:any):any {
    if (!arguments.length) return this._margin.left;
    this._margin.left = _;
    this._width =  (this._element ? this._element.getBoundingClientRect().width: 800) - this._margin.left-this._margin.right;
    this.resizeSvg()
    return this;
  }

    // sets/gets right margin
  marginRight(_:any):any {
    if (!arguments.length) return this._margin.right;
    this._margin.right = _;
    this._width =  (this._element ? this._element.getBoundingClientRect().width: 800) - this._margin.left-this._margin.right;
    this.resizeSvg()
    return this;
  }



  render(data:any) {
    alert(data);
  }
}





