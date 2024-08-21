import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import Chart, { ChartData } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit {
  @Input() data?: ChartData;
  @Input() title?: string;
  chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    if (!this.data) {
      return;
    }

    this.chart = new Chart('LineChart', {
      type: 'line',
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
