import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

const AngularModules = [BrowserModule, BrowserAnimationsModule, RouterModule];

const MaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [...AngularModules, ...MaterialModules, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
