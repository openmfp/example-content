import { Component } from '@angular/core';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { SmallCardComponent } from '../small-card/small-card.component';
import { SmallCardDataModel } from '../small-card/small-card-data.model';


@Component({
  selector: 'app-quick-navigation',
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent, SmallCardComponent],
  templateUrl: './quick-navigation.component.html',
  styleUrl: './quick-navigation.component.scss',
})
export class QuickNavigationComponent {
  categories: SmallCardDataModel[] = [
    {
      name: 'APIs & Services',
      icon: 'document',
    },
    {
      name: 'IAM & Admin',
      icon: 'document',
    },
    {
      name: 'Billing',
      icon: 'document',
    },
    {
      name: 'Compute Engine',
      icon: 'document',
    },
    {
      name: 'Cloud Storage',
      icon: 'document',
    },
    {
      name: 'BigQuery',
      icon: 'document',
    },
    {
      name: 'VPC network',
      icon: 'document',
    },
    {
      name: 'Kubernetes Engine',
      icon: 'document',
    },
  ];

  viewAllProducts() {
    this.categories.push(
      ...[
        {
          name: 'Compute Engine',
          icon: 'document',
        },
        {
          name: 'Cloud Storage',
          icon: 'document',
        },
        {
          name: 'BigQuery',
          icon: 'document',
        },
        {
          name: 'VPC network',
          icon: 'document',
        },
        {
          name: 'Kubernetes Engine',
          icon: 'document',
        },
      ]
    );
  }
}
