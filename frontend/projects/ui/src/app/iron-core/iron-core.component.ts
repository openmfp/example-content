import { Component } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { MockViewComponent } from '../shared/mock-view/mock-view.component';

@Component({
  selector: 'app-iron-core',
  standalone: true,
  imports: [MockViewComponent, Ui5WebcomponentsModule],
  templateUrl: './iron-core.component.html',
  styleUrl: './iron-core.component.scss',
})
export class IronCoreComponent {}
