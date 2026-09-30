import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, {
  providers: [provideServerRouting(serverRoutes)]
});
