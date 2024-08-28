import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import '@ui5/webcomponents-icons/dist/product.js';

@Component({
  selector: 'app-activated-services',
  standalone: true,
  imports: [Ui5WebcomponentsModule],
  templateUrl: './activated-services.component.html',
  styleUrl: './activated-services.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ActivatedServicesComponent implements OnChanges {
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  @Input() parent?: 'account' | 'root';
  readonly services: Record<string, string | null>[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      this.fetchEnabledExtensions();
    }
  }

  fetchEnabledExtensions() {
    let storageKey = 'Luigi#content.d1.openmfp.dxp.k8s.ondemand.com#enabled-catalog-items';
    let dataKey = 'Luigi#content.d1.openmfp.dxp.k8s.ondemand.com#all-catalog-items';

    if (this.context?.accountId) { // accountScope
      storageKey += '-' + this.context.accountId;
    }

    const items: string[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const data: Record<string, string[]> = JSON.parse(localStorage.getItem(dataKey) || '{}');

    if (items?.length) {
      items.forEach((item: string) => {
        this.services.push({
          categories: data[item] ? data[item].join(', ') : null,
          title: item,
        });
      });
    }
  }

  viewMarketplace() {
    const pathname = window.location.pathname.split('/');
    let target = 'marketplace';

    if (!pathname?.length) {
      return;
    }

    if (this.parent === 'account') {
      target = 'capabilities';
    }

    pathname[pathname.length - 1] = target;
    window.location.href = pathname.join('/');
  }
}
