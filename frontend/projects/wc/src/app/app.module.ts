import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { DataChartComponent } from './charts/data-chart/data-chart.component';

@NgModule({
  imports: [BrowserModule, DataChartComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    const dataChartComponent = createCustomElement(DataChartComponent, {injector: this.injector});

    try {
      (window as any).Luigi._registerWebcomponent(document.currentScript?.getAttribute('src'), dataChartComponent);
    } catch (e) {
      if (!customElements.get('data-chart')) {
        customElements.define('data-chart', dataChartComponent);
      }
    }
  }
}
