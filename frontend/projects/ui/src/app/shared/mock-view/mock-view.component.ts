import { Component, Input } from '@angular/core';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { SmallCardDataModel } from '../small-card/small-card-data.model';
import { SmallCardComponent } from '../small-card/small-card.component';
import "@ui5/webcomponents-icons/dist/list.js";

export enum ViewType {
  Grid,
  List
}
@Component({
  selector: 'app-mock-view',
  templateUrl: './mock-view.component.html',
  styleUrls: ['./mock-view.component.scss'],
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent, SmallCardComponent],
})
export class MockViewComponent {
  activeViewType: ViewType = ViewType.Grid;
  viewTypeEnum = ViewType;

  @Input() items: SmallCardDataModel[] = [
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

  getEnabledView(viewType: ViewType) {
    return this.activeViewType === viewType;
  }

  updateActiveViewType(viewType: ViewType) {
    this.activeViewType = viewType;
  }
}
