import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ui5WebcomponentsModule, CardComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'example-content';
}
