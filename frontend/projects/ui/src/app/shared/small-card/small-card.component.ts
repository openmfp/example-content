import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SmallCardDataModel } from './small-card-data.model';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import "@ui5/webcomponents-icons/dist/delete.js";

@Component({
  selector: 'app-small-card',
  standalone: true,
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss',
  imports: [Ui5WebcomponentsModule, IconComponent]
})
export class SmallCardComponent {
  @Input() item!: SmallCardDataModel;
  @Output() deleteItem = new EventEmitter<SmallCardDataModel>();
  @Output() openItem = new EventEmitter<SmallCardDataModel>();

  onDeleteItem(item: SmallCardDataModel) {
    this.deleteItem.emit(item);
  }

  onOpenItem(item: SmallCardDataModel) {
    this.openItem.emit(item);
  }
}
