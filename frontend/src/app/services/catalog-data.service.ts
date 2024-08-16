import { Injectable, Injector } from '@angular/core';

import { ENV, Environment } from '../models/env.token';
import { ExtensionClass, Label } from './extension.schema';


@Injectable({
  providedIn: 'root',
})
export class CatalogDataService {
  private readonly env: Environment;

  constructor(private injector: Injector) {
    this.env = injector.get(ENV, {});
  }

  async getCatalogItems(account?: string): Promise<[ExtensionClass]> {
    const data = await (await fetch('./assets/catalog_gql_dump.json')).json();

    // console.log(data);
    if(account) {
      const enabled: [string] = JSON.parse(localStorage.getItem('enabled-catalog-items') || '[]');
      return ((data.data.getExtensionClassesForScopes as [ExtensionClass]).filter(item => {
        return enabled.indexOf(item.name) >= 0;
      }) as [ExtensionClass]);
    }
    return data.data.getExtensionClassesForScopes;
  }
}