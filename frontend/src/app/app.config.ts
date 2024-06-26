import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideTheming({ defaultTheme: 'sap_horizon', changeThemeOnQueryParamChange: true }), themingInitializer()]
};
