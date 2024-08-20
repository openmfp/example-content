import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemDetailsComponent } from './catalog-item-details/catalog-item-details.component';
import { OpenmcpComponent } from './openmcp/openmcp.component';
import { IronCoreComponent } from './iron-core/iron-core.component';

export const routes: Routes = [
    { path: 'global-catalog', component: CatalogComponent },
    { path: 'catalog-item/:catalogItemId', component: CatalogItemDetailsComponent },
    { path: 'iron-core', component: IronCoreComponent},
    { path: 'openmcp', component: OpenmcpComponent}
];
