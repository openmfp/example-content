import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LuigiContextService } from '@luigi-project/client-support-angular';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { IconComponent } from '@ui5/webcomponents-ngx/main/icon';
import { finalize } from 'rxjs/operators';
import { LOCAL_STORAGE_CATALOG_KEY } from '../app.constants';
import { CatalogContext } from '../models/catalog-model';
import { CatalogDataService } from '../services/catalog-data.service';
import { AccountConnection, AccountConnectionType, ExtensionClass } from '../services/extension.schema';
import { CatalogCardListComponent } from './catalog-card-list/catalog-card-list.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CatalogCardListComponent, CommonModule, IconComponent, Ui5WebcomponentsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
  context?: CatalogContext;
  fetchFinalized = false;
  items: WritableSignal<ExtensionClass[]> = signal([]);
  categories: Set<string> = new Set();
  providers: Set<string> = new Set();
  selectedCategories: string[] = [];
  selectedProviders: string[] = [];
  filteredItems: WritableSignal<ExtensionClass[]> = signal([]);
  private destroyRef = inject(DestroyRef);

  constructor(private dataService: CatalogDataService, private luigiContextService: LuigiContextService) { }

  ngOnInit() {
    this.luigiContextService.getContextAsync().then(ctx => {
      this.fetchItems((ctx['accountId'] || '').trim());
    });
  }

  public onCategoriesChange(e: any) {
    this.selectedCategories = this.updateSelection(e);
    this.filterItems();
  }

  public onProvidersChange(e: any) {
    this.selectedProviders = this.updateSelection(e);
    this.filterItems();
  }

  public filterItems() {
    if (!this.items()) return;

    if (this.selectedCategories.length === 0 && this.selectedProviders.length === 0) {
      this.filteredItems.set(this.items());
      return;
    }

    if (this.selectedCategories.length > 0 && this.selectedProviders.length > 0) {
      this.filteredItems.set(this.items().filter(item =>
        item.category !== undefined && this.selectedCategories.includes(item.category) &&
        item.provider !== undefined && this.selectedProviders.includes(item.provider)
      ));
      return;
    }

    this.filteredItems.set(this.items().filter(item =>
      item.category !== undefined && this.selectedCategories.includes(item.category) ||
      item.provider !== undefined && this.selectedProviders.includes(item.provider)
    ));
  }

  private fetchItems(account: string) {
    // TODO: remove after luigi update
    if (!(window as any)._catalogUpdateListener) {
      (window as any)._catalogUpdateListener = (event: StorageEvent) => {
        if (event.storageArea === localStorage && event.key?.startsWith(LOCAL_STORAGE_CATALOG_KEY)) {
          console.debug('change detected, refetching catalog');
          this.dataService.fetchCatalogItems();
        }
      };
      window.addEventListener('storage', (window as any)._catalogUpdateListener);
    }
    ///////////////

    this.context = account?.length ? CatalogContext.account : CatalogContext.global;

    this.dataService.fetchCatalogItems();
    this.dataService.getCatalogItems(account?.length > 0 ? account : undefined)
      .pipe(finalize(() => this.fetchFinalized = true), takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.updateCatalogItems(account, data));
  }

  private updateCatalogItems(account: string, data: ExtensionClass[]) {
    const storageKey = account ? `${LOCAL_STORAGE_CATALOG_KEY}-${account}` : LOCAL_STORAGE_CATALOG_KEY;
    const globalStorage: string[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

    data?.forEach(item => {
      item.category && this.categories.add(item.category);
      item.provider && this.providers.add(item.provider);

      if (globalStorage.find((name: string) => item.name === name)) {
        item.accountConnections = [];

        item.accountConnections.push(<AccountConnection>{
          name: item.name,
          type: <AccountConnectionType>{context: <string>this.context}
        })
      }
    });

    this.items.set(data);
    this.filterItems();
  }

  private updateSelection(e: any): string[] {
    return e.detail.items.map((item: any) => item._state.text);
  }
}
