import { Component, NgZone, ViewContainerRef, ViewChild} from '@angular/core';
import { DataService } from './data.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'my-app',
  styles: [` `],
  templateUrl: "./templates/app.html",
  //providers: [DataService]
})
export class AppComponent implements OnInit {
  private viewContainerRef: ViewContainerRef;
  zone: NgZone;


  constructor(private dataSummaryService: DataService, zone: NgZone, viewContainerRef:ViewContainerRef) { 

  }

  ngOnInit() {

  }


}