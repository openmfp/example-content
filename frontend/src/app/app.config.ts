import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';
import { ContentDensityService, RtlService } from '@fundamental-ngx/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client';
import { apiurl } from './graphql.config';
import { HttpClientModule } from '@angular/common/http';
import { setContext } from '@apollo/client/link/context';
import { ApolloFactory } from './apollo-factory';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(), 
    provideTheming({ defaultTheme: 'sap_horizon', changeThemeOnQueryParamChange: true }), 
    themingInitializer(),
    RtlService,
    ApolloFactory,
    ContentDensityService,
    importProvidersFrom(HttpClientModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloOptionsFactory,
      deps: [HttpLink, ApolloFactory],
    },
    Apollo]
};

export function apolloOptionsFactory(httpLink: HttpLink, apolloFactory: ApolloFactory) {
  // Use the ApolloFactory to create the Apollo configuration
  return apolloFactory.createApollo(httpLink);
}