import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './reducers';
import * as productState from './feature/state/reducer'
import { provideEffects } from '@ngrx/effects';
import { CacheEffects } from './feature/state/product.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(),
    provideHttpClient(), provideAnimationsAsync(), 
    provideStore(reducers,{metaReducers}),
    provideState(productState.productsFeatureKey,
      productState.productReducer),
      provideEffects(CacheEffects),

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
