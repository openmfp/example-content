import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemDetailsComponent } from './catalog-item-details/catalog-item-details.component';
import { OpenmcpComponent } from './openmcp/openmcp.component';
import { IronCoreComponent } from './iron-core/iron-core.component';
import { ShowcaseComponent } from './showcase/showcase.component';

export const routes: Routes = [
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'global-catalog', component: CatalogComponent },
  {
    path: 'catalog-item/:catalogItemId',
    component: CatalogItemDetailsComponent,
  },
  {
    path: 'iron-core',
    component: IronCoreComponent,
    children: [
      { path: 'compute', component: IronCoreComponent },
      { path: 'network', component: IronCoreComponent },
    ],
  },
  {
    path: 'openmcp',
    component: OpenmcpComponent,
    children: [{ path: 'control-planes', component: OpenmcpComponent }],
  },
];
