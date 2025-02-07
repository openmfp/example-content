import { Component } from '@angular/core';
import { linkManager } from '@luigi-project/client';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

@Component({
  selector: 'app-showcase-details',
  standalone: true,
  imports: [Ui5WebcomponentsModule],
  templateUrl: './showcase-details.component.html',
  styleUrl: './showcase-details.component.scss'
})
export class ShowcaseDetailsComponent {

  navigate() {
    linkManager().fromContext('showcase').navigate(`/`);
  }
}
