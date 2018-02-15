import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { CustomRouterStateSerializer } from './common/ngrx';
import { reducers, metaReducers, AppEffects } from './ngrx';
import { SERVICES } from './services';
import { COMPONENTS } from './components';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,

    MatFormFieldModule,
    MatSelectModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Vehicles Location',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [
    ...SERVICES,
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  declarations: [
    ...COMPONENTS,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
