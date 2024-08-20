import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { CatalogContext } from '../../models/catalog-model';
import { CatalogCardComponent } from '../catalog-card/catalog-card.component';
import { ExtensionClass } from '../../services/extension.schema';

@Component({
  selector: 'app-catalog-card-list',
  standalone: true,
  imports: [CatalogCardComponent, Ui5WebcomponentsModule],
  templateUrl: './catalog-card-list.component.html',
  styleUrls: ['./catalog-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogCardListComponent {
  @Input() context?: CatalogContext;
  @Input() items?: ExtensionClass[];
}
