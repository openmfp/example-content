import { Component, OnInit } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { CatalogCardComponent } from '../catalog-card/catalog-card.component';

@Component({
  selector: 'app-catalog-card-list',
  templateUrl: './catalog-card-list.component.html',
  styleUrls: ['./catalog-card-list.component.scss'],
  standalone: true,
  imports: [Ui5WebcomponentsModule, CatalogCardComponent]
})
export class CatalogCardListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
