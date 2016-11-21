import { Component, NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import * as _ from 'lodash-es';
import { DataService } from './data.service';

@Component({
  selector: 'item-detail',
  styles: [`
  `],
    templateUrl: "./templates/item-detail.html",
})
export class ItemDetailComponent implements OnInit {
  item: any;

  constructor(private dataService: DataService, zone: NgZone) { 
    this.dataService.selectedItem.subscribe(d => {
      this.item = d
    })
  }

  onChange() {

  }

  ngOnInit(): void {
  }

}
