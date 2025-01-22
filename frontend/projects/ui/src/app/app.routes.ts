import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemDetailsComponent } from './catalog-item-details/catalog-item-details.component';
import { OpenmcpComponent } from './openmcp/openmcp.component';
import { IronCoreComponent } from './iron-core/iron-core.component';
import { HttpBinComponent } from './httpbin/httpbin.component';
import { CreateHttpBinModalComponent } from './create-httpbin-modal/create-httpbin-modal.component';
import { HttpBinOverviewComponent } from './httpbin-overview/httpbin-overview.component';

export const routes: Routes = [
  { path: 'platform-mesh-catalog', component: CatalogComponent },
  {
    path: 'platform-mesh-catalog/:catalogItemId',
    component: CatalogItemDetailsComponent,
  },
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
  { path: 'httpbins', component: HttpBinComponent },
  { path: 'httpbins/create', component: CreateHttpBinModalComponent },
  { path: 'httpbins/:httpbinName', component: HttpBinOverviewComponent },
];
