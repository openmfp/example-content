import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { DataChartComponent } from './charts/data-chart/data-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { RootOverviewComponent } from './root-overview/root-overview.component';
import { ServicesComponent } from './services/services.component';
import { EnabledCapabilitiesComponent } from './enabled-capabilities/enabled-capabilities.component';

@NgModule({
  imports: [BrowserModule, DataChartComponent, DoughnutChartComponent],
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

    try {
      this.registerWebcomponent(dataChartComponent, 'chart');
      this.registerWebcomponent(doughnutChartComponent, 'doughnut');
      this.registerWebcomponent(servicesComponent, 'services');
      this.registerWebcomponent(accountOverviewComponent, 'account-overview');
      this.registerWebcomponent(rootOverviewComponent, 'root-overview');
      this.registerWebcomponent(enabledCapabilitiesComponent, 'enabled-capabilities');
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
