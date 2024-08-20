import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { linkManager } from '@luigi-project/client'
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { CatalogContext } from '../../models/catalog-model';
import { ItemStatePipe } from '../../pipes/item-state.pipe';
import { CatalogDataService } from '../../services/catalog-data.service';
import { ExtensionClass } from '../../services/extension.schema';

@Component({
  selector: 'app-catalog-card',
  standalone: true,
  imports: [CommonModule, ItemStatePipe, Ui5WebcomponentsModule],
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogCardComponent {
  @Input() context?: CatalogContext;
  @Input() item?: ExtensionClass;

  constructor(private dataService: CatalogDataService) {}

  openExtensionClass() {
    if (this.item) {
      linkManager().openAsModal(this.item.name).then(() => {
        //this.dataService.fetchCatalogItems(); // TODO: re-enable after luigi update and removal of storage listener
     });
    }
  }
}
