import { Component, OnInit } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { IconComponent } from "@ui5/webcomponents-ngx/main/icon";
import { CatalogCardListComponent } from './catalog-card-list/catalog-card-list.component';
import { CommonModule } from '@angular/common';
import { ExtensionClass } from '../services/extension.schema';
import { CatalogDataService } from '../services/catalog-data.service';
import { LuigiContextService } from '@luigi-project/client-support-angular';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent, CatalogCardListComponent, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  items?: ExtensionClass[];
  categories: Set<string> = new Set();
  providers: Set<string> = new Set(); 
  selectedCategories: string[] = [];
  filteredItems: ExtensionClass[] = [];

  constructor(private dataService: CatalogDataService, private luigiContextService: LuigiContextService) { }

  async ngOnInit() {
    this.luigiContextService.getContextAsync().then(ctx => {
      console.log("TEST", ctx);
    });
    this.items = await this.dataService.getCatalogItems();
    this.items.forEach(item => {
      item.category && this.categories.add(item.category);
      item.provider && this.providers.add(item.provider);
    });
  }

  public onCategoriesChange(e: any) {
    let selectedCategories: string[] = [];
    e.detail.items.forEach((item: any) => selectedCategories.push(item._state.text));
    if (this.items) {
     this.filteredItems = this.items.filter(item => item.category !== undefined && selectedCategories.includes(item.category));
    }
  }
}
