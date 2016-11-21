import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent }  from './app.component';
import { ItemListComponent }  from './item-list.component';
import { ItemDetailComponent }  from './item-detail.component';

import { DataService } from './data.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    ModalModule,
  ],
  declarations: [
    AppComponent,    
    ItemListComponent,
    ItemDetailComponent,
  ],
  providers: [ DataService ],
  bootstrap: [ AppComponent,ItemListComponent,ItemDetailComponent]
})
export class AppModule { }