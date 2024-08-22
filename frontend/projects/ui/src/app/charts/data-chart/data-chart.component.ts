import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart, { ChartData } from 'chart.js/auto';

@Component({
  selector: 'app-data-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataChartComponent implements OnInit {
  @Input() data?: ChartData;
  @Input() title?: string;
  @Input() type: 'bar' | 'line' = 'line';
  @ViewChild('dataChart', {read: ElementRef, static: true}) dataChart?: ElementRef<HTMLElement>;
  chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const ctx = (this.dataChart as any)?.nativeElement?.getContext('2d');

    if (!this.data || !ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: this.type,
      data: <any>this.data,
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
