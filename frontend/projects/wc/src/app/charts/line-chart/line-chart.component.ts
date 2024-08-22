import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import Chart, { ChartData } from 'chart.js/auto';
import { LuigiClient } from '@luigi-project/client/luigi-element';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LineChartComponent implements OnChanges {
  @Input() data?: ChartData;
  @Input() title?: string;
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  @ViewChild('lineChart', {read: ElementRef}) lineChart?: ElementRef<HTMLElement>;
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
    const ctx = (this.lineChart as any)?.nativeElement?.getContext('2d');

    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
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
