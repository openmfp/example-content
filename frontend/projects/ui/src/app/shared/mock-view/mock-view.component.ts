import { Component, Input } from '@angular/core';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { SmallCardDataModel } from '../small-card/small-card-data.model';
import { SmallCardComponent } from '../small-card/small-card.component';
import '@ui5/webcomponents-icons/dist/list.js';
import lorem from 'minifaker';
import 'minifaker/locales/en';
import { TitleCasePipe } from '@angular/common';

export enum ViewType {
  Grid,
  List,
}
@Component({
  selector: 'app-mock-view',
  templateUrl: './mock-view.component.html',
  styleUrls: ['./mock-view.component.scss'],
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent, SmallCardComponent],
  providers: [TitleCasePipe],
})
export class MockViewComponent {
  @Input() items!: SmallCardDataModel[];
  activeViewType: ViewType = ViewType.Grid;
  viewTypeEnum = ViewType;

  constructor(private titleCasePipe: TitleCasePipe) {}

  ngOnInit() {
    this.items = this.generateRandomItems();
  }

  generateRandomItems(): SmallCardDataModel[] {
    const randomAmount = Math.floor(Math.random() * 30) + 1;

    return Array.from({ length: randomAmount }, () => ({
      name: this.titleCasePipe.transform(lorem.word({ type: 'noun' })),
      subtitleText: this.titleCasePipe.transform(lorem.word({ type: 'noun' })),
      icon: 'home',
      deletable: true,
      checked: true,
      openable: true,
    }));
  }

  deleteItem(item: SmallCardDataModel) {
    this.items = this.items.filter(i => item.name !== i.name)
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
