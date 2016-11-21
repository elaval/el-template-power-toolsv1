///<reference path="../typings/window.extend.d.ts"/>
import { aux } from "./prototype"


var expectedGrowth = 0.05
var selectedCategory = null;
var detailSelection = {};



aux.tsv("data/data.txt", function(data) {


  window.App.dataService.observer.next(data);



})

