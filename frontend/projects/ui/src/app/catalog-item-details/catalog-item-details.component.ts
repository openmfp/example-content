import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import LuigiClient from '@luigi-project/client';
import { IconComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { filter, tap } from 'rxjs/operators';
import { LOCAL_STORAGE_CATALOG_KEY } from '../app.constants';
import { CatalogContext } from '../models/catalog-model';
import { CatalogDataService } from '../services/catalog-data.service';
import { ExtensionClass } from '../services/extension.schema';
import { PortalLuigiContextService } from '../services/luigi-context.service';
import { GatewayService } from '../services/gateway.service';

@Component({
  selector: 'app-catalog-item-details',
  standalone: true,
  imports: [CommonModule, IconComponent, Ui5WebcomponentsModule],
  templateUrl: './catalog-item-details.component.html',
  styleUrl: './catalog-item-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogItemDetailsComponent implements OnInit {
  account?: string;
  catalogItemId?: string | null;
  catalogItem: WritableSignal<ExtensionClass | null> = signal(null);
  buttonVisible: WritableSignal<boolean> = signal(false);
  context?: CatalogContext;
  namespace?: string;

  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private dataService: CatalogDataService,
    private luigiContextService: PortalLuigiContextService,
    private gatewayService: GatewayService
  ) {}

  ngOnInit() {
    this.catalogItemId = this.route.snapshot.paramMap.get('catalogItemId');

    if (!this.catalogItemId) {
      return;
    }

    this.luigiContextService.getContextAsync().then((ctx) => {
      this.account = (ctx['accountId'] || '').trim();
      this.context = this.account?.length
        ? CatalogContext.account
        : CatalogContext.global;

      this.setButtonVisibility();
      let isPlatformMeshCatalog = window.location.href.includes('platform-mesh-catalog');
      this.fetchItemDetails(isPlatformMeshCatalog);
    });
  }

  toggleCatalogItem() {
    const storageKey = this.account
      ? `${LOCAL_STORAGE_CATALOG_KEY}-${this.account}`
      : LOCAL_STORAGE_CATALOG_KEY;
    let globalStorage: string[] = JSON.parse(
      localStorage.getItem(storageKey) || '[]'
    );

    if (this.buttonVisible()) {
      globalStorage.push(this.catalogItemId as string);
      this.buttonVisible.set(false);
      if (this.context === CatalogContext.account) {
        this.gatewayService
          .enableContentConfiguration(
            `${this.catalogItemId}-${this.account}`,
            'openmfp-system',
            this.catalogItem()?.displayName,
          )
          .subscribe();
      }
    } else {
      globalStorage = globalStorage.filter(
        (name) => name !== this.catalogItemId
      );
      if (this.context === CatalogContext.account) {
        this.gatewayService
          .disableContentConfiguration(
            `${this.catalogItemId}-${this.account}`,
            'openmfp-system'
          )
          .subscribe();
      }
      this.buttonVisible.set(true);
    }

    localStorage.setItem(storageKey, JSON.stringify(globalStorage));
    LuigiClient.storageManager().setItem(
      storageKey,
      JSON.stringify(globalStorage)
    );
  }

  private setButtonVisibility() {
    const storageKey = this.account
      ? `${LOCAL_STORAGE_CATALOG_KEY}-${this.account}`
      : LOCAL_STORAGE_CATALOG_KEY;
    const globalStorage: string[] = JSON.parse(
      localStorage.getItem(storageKey) || '[]'
    );

    if (!globalStorage.find((name: string) => name === this.catalogItemId)) {
      this.buttonVisible.set(true);
    }
  }

  private fetchItemDetails(isPoc: boolean) {
    if(isPoc) {
      this.dataService.fetchCatalogItems();
    } else {
      this.dataService.fetchPocCatalogItems();
    }
    this.dataService
      .getCatalogItems()
      .pipe(
        filter((data) => data.length > 0),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data) => {
        this.catalogItem.set(
          data?.filter((item) => item.name === this.catalogItemId)[0] || null
        );
      });
  }
}
