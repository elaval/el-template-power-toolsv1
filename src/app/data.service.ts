import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppNamespace } from "./app-namespace"

import { Injectable, NgZone } from '@angular/core';
import * as _ from "lodash-es";


@Injectable()
export class DataService {
  private rawData: any[];

  observer = new BehaviorSubject([]);
  notifier = new BehaviorSubject([]);
  categoryBeacon = new BehaviorSubject(""); // Use as a bridge between thos who notify a new category and those who need to subscribe to it
  data:Observable<any[]>;
  selectedCategory: string;
  selectedItem:Observable<string>;
  selectedItemSubject:BehaviorSubject<string>;
  zone:NgZone;

  constructor(zone: NgZone) {
    this.zone = zone;
    // Make the dataService available through global namespace (i.e. window.App)
    
    AppNamespace.dataService = this;

    this.selectedItemSubject = new BehaviorSubject("");
    this.selectedItem = this.selectedItemSubject.asObservable();


    this.data = this.notifier.asObservable();
    
    // We receive data from an external feed to our observer (observer.next(data))
    this.observer.subscribe(data => {

      this.zone.run( () => { // Propagate the changes that have been triggered from outside
        this.rawData = <any[]> data;
        this.notifier.next(data);      
      });

    });


    this.categoryBeacon.subscribe(d => {
    });
  }

  selectItem(item:string) {
    this.selectedItemSubject.next(item);
  }
 
}



