import * as d3 from "d3";

export var aux:any = {
    tsv : d3.tsv,
}


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
