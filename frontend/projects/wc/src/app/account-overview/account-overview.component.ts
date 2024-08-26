import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { array, color, number } from 'minifaker';
import { DataChartComponent } from '../charts/data-chart/data-chart.component';
import { DoughnutChartComponent } from '../charts/doughnut-chart/doughnut-chart.component';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-account-overview',
  standalone: true,
  imports: [CommonModule, DataChartComponent, DoughnutChartComponent, ServicesComponent, Ui5WebcomponentsModule],
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AccountOverviewComponent implements OnChanges {
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  @Input() title = 'Resource Overview';
  readonly instanceData = {
    color: color(),
    total: 100,
    value: number({
      min: 1,
      max: 99,
      float: false
    })
  };
  readonly clusterData = {
    color: color(),
    total: 100,
    value: number({
      min: 1,
      max: 99,
      float: false
    })
  };
  readonly chartData = {
    labels: ['CW15', 'CW16', 'CW17', 'CW18', 'CW19', 'CW20'],
    datasets: [
      {
        label: 'Idle',
        data: array(6, () => number({
          min: 500000,
          max: 699000,
          float: false
        })),
        backgroundColor: '#0070f2',
        borderColor: '#0070f2'
      },
      {
        label: 'Active',
        data: array(6, () => number({
          min: 200000,
          max: 399000,
          float: false
        })),
        backgroundColor: '#c87b00',
        borderColor: '#c87b00'
      }
    ]
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      this.title = changes['context'].currentValue.title;
    }
  }
}
