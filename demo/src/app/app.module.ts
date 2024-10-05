import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PropertyNameComponent } from './property-name/property-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyComponent } from './property/property.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyNameComponent,
    PropertyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
