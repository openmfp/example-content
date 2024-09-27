import { Component, OnInit } from '@angular/core';
import {
  DynamicPageComponent,
  Ui5WebcomponentsModule,
} from '@ui5/webcomponents-ngx';
import { ChartData } from 'chart.js';
import { DataChartComponent } from '../charts/data-chart/data-chart.component';
import { MockViewComponent } from '../shared/mock-view/mock-view.component';
import { LuigiContextService } from '@luigi-project/client-support-angular';

@Component({
  selector: 'app-openmcp',
  standalone: true,
  imports: [
    DataChartComponent,
    Ui5WebcomponentsModule,
    DynamicPageComponent,
    MockViewComponent,
  ],
  templateUrl: './openmcp.component.html',
  styleUrl: './openmcp.component.scss',
})
export class OpenmcpComponent implements OnInit {
  constructor(private readonly luigiContext: LuigiContextService) {}

  title: string = '';

  readonly chartData: ChartData = {
    labels: ['CW14', 'CW15', 'CW16', 'CW17', 'CW18', 'CW19', 'CW20'],
    datasets: [
      {
        label: 'Revenue',
        data: [431000, 491000, 485000, 536000, 670000, 680000, 659000],
        backgroundColor: '#0070f2',
        borderColor: '#0070f2',
      },
      {
        label: 'Costs',
        data: [230000, 238000, 221000, 280000, 230000, 250000, 325000],
        backgroundColor: '#c87b00',
        borderColor: '#c87b00',
      },
    ],
  };

  ngOnInit(): void {
    this.luigiContext.contextObservable().subscribe((context) => {
      this.title = context.context?.['title'] ?? '';
    });
  }
}
