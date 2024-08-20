import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE_CATALOG_KEY } from '../app.constants';
import { ENV, Environment } from '../models/env.token';
import { ExtensionClass } from './extension.schema';

@Injectable({
  providedIn: 'root',
})
export class CatalogDataService {
  private readonly catalogItems: Subject<ExtensionClass[]> = new Subject<ExtensionClass[]>();
  private readonly env: Environment;

  constructor(private injector: Injector) {
    this.env = injector.get(ENV, {});
  }

  fetchCatalogItems() {
    fetch('./assets/catalog_gql_dump.json')
      .then(response => response.json())
      .then(data => this.catalogItems.next(data?.data?.getExtensionClassesForScopes));
  }

  getCatalogItems(account?: string): Observable<ExtensionClass[]> {
    return this.catalogItems.asObservable().pipe(map(data => {
      if (account) {
        const enabled: string[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATALOG_KEY) || '[]');

        return data.filter(item => enabled.indexOf(item.name) >= 0);
      }

      return data;
    }));
  }
}