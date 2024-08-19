import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { CatalogDataService } from '../services/catalog-data.service';
import { ActivatedRoute } from '@angular/router';
import { ExtensionClass } from '../services/extension.schema';

@Component({
  selector: 'app-catalog-item-details',
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent, CommonModule],
  templateUrl: './catalog-item-details.component.html',
  styleUrl: './catalog-item-details.component.scss'
})
export class CatalogItemDetailsComponent implements OnInit {
  catalogItemId?: string;
  catalogItem?: ExtensionClass;

  constructor(private route: ActivatedRoute, private dataService: CatalogDataService) { }
  
  async ngOnInit() {
    this.catalogItemId = this.route.snapshot.paramMap.get('catalogItemId') || undefined;
    if(this.catalogItemId) {
      this.catalogItem = (await this.dataService.getCatalogItems()).filter(item => {
        return item.name === this.catalogItemId;
      })[0];
    }
  }

  enableCatalogItem() {
    // TODO: logic to enable item here
  }
}
