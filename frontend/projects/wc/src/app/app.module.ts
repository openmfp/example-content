import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { DataChartComponent } from './charts/data-chart/data-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { EnabledCapabilitiesComponent } from './enabled-capabilities/enabled-capabilities.component';
import { RootOverviewComponent } from './root-overview/root-overview.component';
import { ServicesComponent } from './services/services.component';
import { QuickNavigationComponent } from './quick-navigation/quick-navigation.component';
import { SmallCardComponent } from './small-card/small-card.component';

@NgModule({
  imports: [
    AccountOverviewComponent,
    BrowserModule,
    DataChartComponent,
    DoughnutChartComponent,
    EnabledCapabilitiesComponent,
    RootOverviewComponent,
    ServicesComponent,
    QuickNavigationComponent,
    SmallCardComponent
  ],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  registerWebcomponent(component: NgElementConstructor<unknown>, hash: string) {
    const url = new URL((document.currentScript?.getAttribute('src') as string));

    if (url.hash === '#' + hash) {
      (window as any).Luigi._registerWebcomponent(url, component);
    }
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    const dataChartComponent = createCustomElement(DataChartComponent, {injector: this.injector});
    const doughnutChartComponent = createCustomElement(DoughnutChartComponent, {injector: this.injector});
    const servicesComponent = createCustomElement(ServicesComponent, {injector: this.injector});
    const accountOverviewComponent = createCustomElement(AccountOverviewComponent, {injector: this.injector});
    const rootOverviewComponent = createCustomElement(RootOverviewComponent, {injector: this.injector});
    const enabledCapabilitiesComponent = createCustomElement(EnabledCapabilitiesComponent, {injector: this.injector});
    const quickNavigationComponent = createCustomElement(QuickNavigationComponent, {injector: this.injector});
    const smallCardComponent = createCustomElement(SmallCardComponent, {injector: this.injector});

    try {
      this.registerWebcomponent(dataChartComponent, 'chart');
      this.registerWebcomponent(doughnutChartComponent, 'doughnut');
      this.registerWebcomponent(servicesComponent, 'services');
      this.registerWebcomponent(accountOverviewComponent, 'account-overview');
      this.registerWebcomponent(rootOverviewComponent, 'root-overview');
      this.registerWebcomponent(enabledCapabilitiesComponent, 'enabled-capabilities');
      this.registerWebcomponent(quickNavigationComponent, 'quick-navigation');
      this.registerWebcomponent(smallCardComponent, 'small-card');
    } catch (e) {
      if (!customElements.get('data-chart')) {
        customElements.define('data-chart', dataChartComponent);
      }
      if (!customElements.get('doughnut-chart')) {
        customElements.define('doughnut-chart', doughnutChartComponent);
      }
    }
  }
}
