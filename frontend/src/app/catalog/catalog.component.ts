import { Component } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { IconComponent } from "@ui5/webcomponents-ngx/main/icon";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [Ui5WebcomponentsModule, IconComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

}
