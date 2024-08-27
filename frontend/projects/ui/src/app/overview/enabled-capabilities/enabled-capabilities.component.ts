import { Component } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { SmallCardDataModel } from '../../shared/small-card/small-card-data.model';
import { SmallCardComponent } from '../../shared/small-card/small-card.component';

@Component({
  selector: 'app-enabled-capabilities',
  standalone: true,
  imports: [SmallCardComponent, Ui5WebcomponentsModule],
  templateUrl: './enabled-capabilities.component.html',
  styleUrl: './enabled-capabilities.component.scss'
})
export class EnabledCapabilitiesComponent {
  readonly capabilities: SmallCardDataModel[] = [
    {
      image: 'https://d.ing.gardener-op.mfp-dev.shoot.canary.k8s-hana.ondemand.com/static/assets/logo.svg',
      name: 'Gardener',
    },
    {
      image: 'https://avatars.githubusercontent.com/u/147836484?s=200&v=4',
      name: 'Iron Core',
    },
    {
      image: 'https://content.d1.openmfp.dxp.k8s.ondemand.com/ui/wc/assets/openmcp.png',
      name: 'OpenMCP',
    },
  ];
}
