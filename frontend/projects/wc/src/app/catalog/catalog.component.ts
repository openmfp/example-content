import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, Ui5WebcomponentsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CatalogComponent implements OnChanges {
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;

  title?: string;
  dummyData?: string[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      this.title = changes['context'].currentValue.title;
      this.fetchEnabledExtensions();
    }
  }

  fetchEnabledExtensions() {
    let storageKey = 'Luigi#content.d1.openmfp.dxp.k8s.ondemand.com#enabled-catalog-items';

    if (this.context.accountId) { // acocuntScope
      storageKey += '-' + this.context.accountId;
    }

    this.dummyData = JSON.parse(localStorage.getItem(storageKey) || '[]');
  }
}
