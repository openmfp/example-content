import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { CatalogDataService } from '../services/catalog-data.service';
import { ExtensionClass } from '../services/extension.schema';
import { LuigiContextService } from '@luigi-project/client-support-angular';

@Component({
  selector: 'app-catalog-item-details',
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent, CommonModule],
  templateUrl: './catalog-item-details.component.html',
  styleUrl: './catalog-item-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogItemDetailsComponent implements OnInit {
  catalogItemId?: string | null;
  catalogItem: WritableSignal<ExtensionClass | null> = signal(null);
  buttonVisible: WritableSignal<boolean> = signal(false);
  private destroyRef = inject(DestroyRef);
  account?: string;

  constructor(private route: ActivatedRoute, private dataService: CatalogDataService, private luigiContextService: LuigiContextService) {}
  
  ngOnInit() {
    this.catalogItemId = this.route.snapshot.paramMap.get('catalogItemId');

    if (!this.catalogItemId) {
      return;
    }
    this.luigiContextService.getContextAsync().then(ctx => {
      this.account = ctx['accountId'];
      this.setButtonVisibility();
      this.fetchItemDetails();
    });
  }

  toggleCatalogItem() {
    const storageKey = this.account ? 'enabled-catalog-items-' + this.account : 'enabled-catalog-items';
    let globalStorage: string[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (this.buttonVisible()) {
      globalStorage.push(this.catalogItemId as string);
      this.buttonVisible.set(false);
    } else {
      globalStorage = globalStorage.filter(name => name !== this.catalogItemId);
      this.buttonVisible.set(true);
    }

    localStorage.setItem(storageKey, JSON.stringify(globalStorage));
    
  }

  private setButtonVisibility() {
    const storageKey = this.account ? 'enabled-catalog-items-' + this.account : 'enabled-catalog-items';
    const globalStorage: string[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (!globalStorage.find((name: string) => name === this.catalogItemId)) {
      this.buttonVisible.set(true);
    }
  }

  private fetchItemDetails() {
    this.dataService.fetchCatalogItems();
    this.dataService.getCatalogItems()
      .pipe(filter(data => data.length > 0), takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.catalogItem.set(data?.filter(item => item.name === this.catalogItemId)[0] || null);
      });
  }
}
