import { Component, NgZone, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { OnInit } from '@angular/core';
import * as _ from 'lodash-es';


@Component({
  selector: 'item-list',
  templateUrl: "./templates/item-list.html",
})
export class ItemListComponent implements OnInit {
  zone:NgZone;
  names:string[];
  selectedCategory: string;

  constructor(private dataService: DataService, zone: NgZone) { 
    this.zone = zone;

    this.dataService.data.subscribe((data:any[]) => {
      this.names = <string[]> _.chain(data).groupBy((d)=>d.name).keys().value();
    })

    this.dataService.selectedItem.subscribe((name:string) => {
      this.selectedCategory = name;
    })
  }
  
  onSelect(name:string) {
    this.selectedCategory = name;
    this.dataService.selectItem(name)
  }


  ngAfterViewInit() {
  }

  ngAfterContentInit() {
  }


  ngOnInit(): void {
  }
}
