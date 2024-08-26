import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { SmallCardDataModel } from '../small-card/small-card-data.model';
import { SmallCardComponent } from '../small-card/small-card.component';

@Component({
  selector: 'app-mock-view',
  templateUrl: './mock-view.component.html',
  styleUrls: ['./mock-view.component.scss'],
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent, SmallCardComponent],
})
export class MockViewComponent {
  items = [
    {
      name: 'Home',
      subtitleText: 'Subtitle',
      icon: 'home',
      deletable: true,
      checked: true,
      openable: true,
    },
    {
      name: 'Home',
      subtitleText: 'Subtitle',
      icon: 'home',
      deletable: true,
      checked: true,
      openable: true,
    },
    {
      name: 'Home',
      subtitleText: 'Subtitle',
      icon: 'home',
      deletable: true,
      checked: true,
      openable: true,
    },
    {
      name: 'Home',
      subtitleText: 'Subtitle',
      icon: 'home',
      deletable: true,
      checked: true,
      openable: true,
    },
    {
      name: 'Home',
      subtitleText: 'Subtitle',
      icon: 'home',
      deletable: true,
      checked: true,
      openable: true,
    },
    {
      name: 'Home',
      subtitleText: 'Subtitle',
      icon: 'home',
      deletable: true,
      checked: true,
      openable: true,
    },
  ];

  deleteItem(item: SmallCardDataModel) {
    console.log('deleteItem');
  }

  openItem(item: SmallCardDataModel) {
    console.log('openItem');
  }
}
