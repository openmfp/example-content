import { Component, Input } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { ShowcasePanel } from './showcase-panel';

@Component({
  selector: 'app-showcase-panel',
  standalone: true,
  imports: [Ui5WebcomponentsModule],
  templateUrl: './showcase-panel.component.html',
  styleUrl: './showcase-panel.component.scss'
})
export class ShowcasePanelComponent {

  @Input()
  public item: ShowcasePanel | undefined;

}
