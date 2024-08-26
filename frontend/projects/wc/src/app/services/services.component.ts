import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import '@ui5/webcomponents-icons/dist/product.js';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, Ui5WebcomponentsModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ServicesComponent implements OnChanges {
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  dummyData?: string[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      this.fetchEnabledExtensions();
    }
  }

  fetchEnabledExtensions() {
    let storageKey = 'Luigi#content.d1.openmfp.dxp.k8s.ondemand.com#enabled-catalog-items';

    if (this.context?.accountId) { // accountScope
      storageKey += '-' + this.context.accountId;
    }

    this.dummyData = JSON.parse(localStorage.getItem(storageKey) || '[]');
  }
}
