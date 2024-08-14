import { Component } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [Ui5WebcomponentsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

}
