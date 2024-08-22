import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { DataChartComponent } from './charts/data-chart/data-chart.component';
import { CatalogComponent } from './catalog/catalog.component';

@NgModule({
  imports: [BrowserModule, DataChartComponent],
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
    const catalogComponent = createCustomElement(CatalogComponent, {injector: this.injector});

    try {
      this.registerWebcomponent(dataChartComponent, 'chart');
      this.registerWebcomponent(catalogComponent, 'catalog');
    } catch (e) {
      if (!customElements.get('data-chart')) {
        customElements.define('data-chart', dataChartComponent);
      }
    }
  }
}
