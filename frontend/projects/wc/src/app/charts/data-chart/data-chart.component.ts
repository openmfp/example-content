import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import Chart, { ChartData } from 'chart.js/auto';

@Component({
  selector: 'app-data-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DataChartComponent implements OnChanges {
  @Input() data?: ChartData;
  @Input() title?: string;
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  @Input() type: 'bar' | 'line' = 'line';
  @ViewChild('dataChart', {read: ElementRef, static: true}) dataChart?: ElementRef<HTMLElement>;
  chart: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.createChart(changes['data'].currentValue);
    }

    if (changes['context']) {
      setTimeout(() => {
        this.createChart(changes['context'].currentValue.chartData);
      })
      this.title = changes['context'].currentValue.title;
    }
  }

  createChart(data: any) {
    const ctx = (this.dataChart as any)?.nativeElement?.getContext('2d');

    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: this.type,
      data,
      options: {
        aspectRatio: 2,
        responsive: true,
        elements: {
          line: {
            borderWidth: 2,
            tension: 0.4
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            border: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              pointStyle: 'circle',
              usePointStyle: true
            }
          }
        }
      }
    });
  }
}
