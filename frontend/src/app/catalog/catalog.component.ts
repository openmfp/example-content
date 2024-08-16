import { Component, OnInit } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { IconComponent } from "@ui5/webcomponents-ngx/main/icon";
import { CatalogCardListComponent } from './catalog-card-list/catalog-card-list.component';
import { CommonModule } from '@angular/common';
import { ExtensionClass } from '../services/extension.schema';
import { CatalogDataService } from '../services/catalog-data.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent, CatalogCardListComponent, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {

  items?: [ExtensionClass];
  categories: Set<string> = new Set();
  providers: Set<string> = new Set(); 

  constructor(private dataService: CatalogDataService) { }

  async ngOnInit() {
    this.items = await this.dataService.getCatalogItems();
    this.items.forEach(item => {
      item.category && this.categories.add(item.category);
      item.provider && this.providers.add(item.provider);
    });
  }
}
