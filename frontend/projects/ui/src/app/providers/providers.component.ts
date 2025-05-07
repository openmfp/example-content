import { Component } from '@angular/core';
import { FundamentalNgxCoreModule } from "@fundamental-ngx/core";

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [
    FundamentalNgxCoreModule,
  ],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss'
})
export class ProvidersComponent {

}
