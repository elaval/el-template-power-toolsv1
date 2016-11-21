import {data_migrationSankey} from "../src/data-migrationSankey";
import {data_actualVsPlanned} from "../src/data-actualVsPlanned";

export  {
    migrationSankey
} from "../src/vis-migrationSankey" 

export {
    migrationFlow
} from "../src/vis-widget-migrationFlow"

// Generates aline chart with actual & planned lines
// The area between lines is green when actual is above planned & red when planned above actual
export {
    actualVsPlanned
} from "../src/vis-widget-actualVsPlanned"

export  var dataProviders = {
    migrationSankey : data_migrationSankey,
    actualVsPlanned : data_actualVsPlanned
}



