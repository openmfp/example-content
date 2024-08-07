import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';
import { ContentDensityService, RtlService } from '@fundamental-ngx/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideTheming({ defaultTheme: 'sap_horizon', changeThemeOnQueryParamChange: true }),
    themingInitializer(),
    RtlService,
    ContentDensityService,
    importProvidersFrom(HttpClientModule),
    ]
};

