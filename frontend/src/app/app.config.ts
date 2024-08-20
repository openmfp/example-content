import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';
import { ContentDensityService, RtlService } from '@fundamental-ngx/core';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';
import { LuigiContextService, LuigiContextServiceImpl } from '@luigi-project/client-support-angular';
import { DEFAULT_THEME_NAME } from './app.constants';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideTheming({ defaultTheme: DEFAULT_THEME_NAME, changeThemeOnQueryParamChange: true }),
    themingInitializer(),
    RtlService,
    ContentDensityService,
    importProvidersFrom(HttpClientModule),
    { provide: LuigiContextService, useClass: LuigiContextServiceImpl },
  ]
};
