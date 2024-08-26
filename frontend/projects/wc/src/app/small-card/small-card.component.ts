import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SmallCardDataModel } from './small-card-data.model';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

@Component({
  selector: 'app-small-card',
  standalone: true,
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss',
  imports: [Ui5WebcomponentsModule, IconComponent]
})
export class SmallCardComponent {
  @Input() item!: SmallCardDataModel;
  @Output() deleteItemEvent = new EventEmitter<SmallCardDataModel>();
  @Output() openItemEvent = new EventEmitter<SmallCardDataModel>();

  deleteItem(item: SmallCardDataModel) {
    this.deleteItemEvent.emit(item);
  }

  openItem(item: SmallCardDataModel) {
    this.openItemEvent.emit(item);
  }
}
