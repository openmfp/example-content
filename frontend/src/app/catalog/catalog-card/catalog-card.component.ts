import { Component, Input, OnInit } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { ExtensionClass } from '../../services/extension.schema';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
  standalone: true,
  imports: [Ui5WebcomponentsModule, CommonModule]
})
export class CatalogCardComponent {
  @Input() item?: ExtensionClass;
}
