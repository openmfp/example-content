import { Component, OnInit } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
  standalone: true,
  imports: [Ui5WebcomponentsModule]
})
export class CatalogCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
