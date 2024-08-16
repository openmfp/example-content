import { Injectable, Injector } from '@angular/core';

import { ENV, Environment } from '../models/env.token';
import { ExtensionClass } from './extension.schema';


@Injectable({
  providedIn: 'root',
})
export class CatalogDataService {
  private readonly env: Environment;

  constructor(private injector: Injector) {
    this.env = injector.get(ENV, {});
  }

  async getCatalogItems(): Promise<[ExtensionClass]> {
    const data = await (await fetch('./assets/catalog_gql_dump.json')).json();

    // console.log(data);
    return data.data.getExtensionClassesForScopes;
  }
}