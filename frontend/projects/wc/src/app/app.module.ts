import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { LineChartComponent } from './charts/line-chart/line-chart.component';

@NgModule({
  imports: [BrowserModule, LineChartComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    const lineChartComponent = createCustomElement(LineChartComponent, {injector: this.injector});
    try {
      (window as any).Luigi._registerWebcomponent(document.currentScript?.getAttribute('src'), lineChartComponent);
    } catch (e) {
      if (!customElements.get('line-chart')) {
        customElements.define('line-chart', lineChartComponent);
      }
    }
  }
}
