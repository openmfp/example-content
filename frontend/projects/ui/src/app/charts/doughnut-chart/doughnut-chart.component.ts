import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoughnutChartComponent implements OnInit {
  @Input() data?: Record<string, any>;
  @ViewChild('dataChart', {read: ElementRef, static: true}) dataChart?: ElementRef<HTMLElement>;
  chart: any;
  subtitle?: string;
  title?: string | null;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const ctx = (this.dataChart as any)?.nativeElement?.getContext('2d');

    if (!this.data || !ctx) {
      return;
    }

    const percentage: number = (100 * this.data['value']) / this.data['total'];

    this.title = percentage ? `${Math.floor(percentage)}%` : null;
    this.subtitle = `${this.data['value']} ${this.data['unit'] || ''} / ${this.data['total']} ${this.data['unit'] || ''}`;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            this.data['value'],
            this.data['total'] - this.data['value']
          ],
          backgroundColor: [
            this.data['color'],
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
