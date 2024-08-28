import { Injectable, Injector } from '@angular/core';
import LuigiClient from '@luigi-project/client';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LOCAL_STORAGE_CATALOG_KEY,
  LOCAL_STORAGE_CATEGORIES_KEY,
  LOCAL_STORAGE_DATA_KEY
} from '../app.constants';
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
      .then(data => {
        const catalogData: ExtensionClass[] = data?.data?.getExtensionClassesForScopes || [];

        this.catalogItems.next(catalogData);
        this.setCatalogData(catalogData);
      });
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

  private setCatalogData(data: ExtensionClass[]) {
    const storageKey = LOCAL_STORAGE_DATA_KEY;
    const mappedData: Record<string, string>[] = data.map((item: ExtensionClass) => ({
      category: <string>item.category,
      name: <string>item.name
    }));
    const storageData: Record<string, string[]> = {};

    mappedData.forEach((item: Record<string, string>) => {
      const categoryName = item['category'] === null ? 'Unknown' : item['category'];

      if (storageData[item['name']]) {
        storageData[item['name']].push(categoryName);
      } else {
        storageData[item['name']] = [categoryName];
      }
    });

    this.setCatalogCategories(mappedData);
    localStorage.setItem(storageKey, JSON.stringify(storageData));
    LuigiClient.storageManager().setItem(
      storageKey,
      JSON.stringify(storageData)
    );
  }

  private setCatalogCategories(data: Record<string, string>[]) {
    const storageKey = LOCAL_STORAGE_CATEGORIES_KEY;
    const storageData: string[] = [];

    data.forEach((item: Record<string, string>) => {
      const categoryName = item['category'] ? item['category'] : 'Unknown';

      if (!storageData.includes(categoryName)) {
        storageData.push(categoryName);
      }
    });

    localStorage.setItem(storageKey, JSON.stringify(storageData.sort()));
    LuigiClient.storageManager().setItem(
      storageKey,
      JSON.stringify(storageData.sort())
    );
  }
}