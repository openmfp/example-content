import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DoughnutChartComponent implements OnChanges {
  @Input() data?: Record<string, any>;
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  @ViewChild('dataChart', {read: ElementRef, static: true}) dataChart?: ElementRef<HTMLElement>;
  chart: any;
  subtitle?: string;
  title?: string | null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.createChart(changes['data'].currentValue);
    }

    if (changes['context']) {
      setTimeout(() => {
        this.createChart(changes['context'].currentValue.chartData);
      })
    }
  }

  createChart(data: any) {
    const ctx = (this.dataChart as any)?.nativeElement?.getContext('2d');

    if (!ctx) {
      return;
    }

    const percentage: number = (100 * data['value']) / data['total'];

    this.title = percentage ? `${Math.floor(percentage)}%` : null;
    this.subtitle = `${data['value']} ${data['unit'] || ''} / ${data['total']} ${data['unit'] || ''}`;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            data['value'],
            data['total'] - data['value']
          ],
          backgroundColor: [
            data['color'],
            '#EEE'
          ]
        }]
      },
      options: {
        animation: false,
        cutout: 85,
        events: [],
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
