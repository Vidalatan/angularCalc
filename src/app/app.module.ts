import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContextService } from './context.service';

@NgModule({
  declarations: [
    AppComponent,
    ...routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ContextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
