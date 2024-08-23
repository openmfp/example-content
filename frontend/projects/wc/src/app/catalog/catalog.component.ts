import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { DataChartComponent } from '../charts/data-chart/data-chart.component';
import { DoughnutChartComponent } from '../charts/doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, DataChartComponent, DoughnutChartComponent, Ui5WebcomponentsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CatalogComponent implements OnChanges {
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  dummyData?: string[];
  title = 'Resource Overview';
  readonly instanceData = {
    color: '#AD49E1',
    total: 100,
    value: 60
  };
  readonly clusterData = {
    color: '#41B3A2',
    total: 100,
    value: 80
  };
  readonly chartData = {
    labels: ['CW14', 'CW15', 'CW16', 'CW17', 'CW18', 'CW19', 'CW20'],
    datasets: [
      {
        label: 'Idle',
        data: [431000, 491000, 485000, 536000, 670000, 680000, 659000],
        backgroundColor: '#0070f2',
        borderColor: '#0070f2'
      },
      {
        label: 'Active',
        data: [230000, 238000, 221000, 280000, 230000, 250000, 325000],
        backgroundColor: '#c87b00',
        borderColor: '#c87b00'
      }
    ]
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      this.title = changes['context'].currentValue.title;
      this.fetchEnabledExtensions();
    }
  }

  fetchEnabledExtensions() {
    let storageKey = 'Luigi#content.d1.openmfp.dxp.k8s.ondemand.com#enabled-catalog-items';

    if (this.context.accountId) { // acocuntScope
      storageKey += '-' + this.context.accountId;
    }

    this.dummyData = JSON.parse(localStorage.getItem(storageKey) || '[]');
  }
}
