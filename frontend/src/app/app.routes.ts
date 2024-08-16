import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemDetailsComponent } from './catalog-item-details/catalog-item-details.component';

export const routes: Routes = [
    { path: 'global-catalog', component: CatalogComponent },
    { path: 'catalog-item/:catalogItemId', component: CatalogItemDetailsComponent }
];
