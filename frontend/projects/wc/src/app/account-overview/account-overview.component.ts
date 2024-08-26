import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
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
    }
  }
}
