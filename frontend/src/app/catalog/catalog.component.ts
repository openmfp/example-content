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
  items?: ExtensionClass[];
  categories: Set<string> = new Set();
  providers: Set<string> = new Set();
  selectedCategories: string[] = [];
  selectedProviders: string[] = [];
  filteredItems!: ExtensionClass[];

  constructor(private dataService: CatalogDataService) { }

  async ngOnInit() {
    this.items = await this.dataService.getCatalogItems();
    this.items.forEach(item => {
      item.category && this.categories.add(item.category);
      item.provider && this.providers.add(item.provider);
    });
    this.filteredItems = this.items;
  }

  public onCategoriesChange(e: any) {
    this.selectedCategories = [
      ...e.detail.items.map((item: any) => item._state.text)
    ];
    this.filterItems();

  }

  public onProvidersChange(e: any) {
    this.selectedProviders = [
      ...e.detail.items.map((item: any) => item._state.text)
    ];
    this.filterItems();
  }

  public filterItems() {
    if (!this.items) return;

    if (this.selectedCategories.length === 0 && this.selectedProviders.length === 0) {
      this.filteredItems = this.items;
      return;
    } 
    
    if (this.selectedCategories.length > 0 && this.selectedProviders.length > 0) {
      this.filteredItems = this.items.filter(item => 
        item.category !== undefined && this.selectedCategories.includes(item.category) &&
        item.provider !== undefined && this.selectedProviders.includes(item.provider)
      );
      return;
    }

   this.filteredItems = this.items.filter(item => 
        item.category !== undefined && this.selectedCategories.includes(item.category) ||
        item.provider !== undefined && this.selectedProviders.includes(item.provider)
      );
  }
}
