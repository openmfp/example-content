import { Component } from '@angular/core';
import {DynamicPageModule, FormModule, FundamentalNgxCoreModule, IllustratedMessageModule} from "@fundamental-ngx/core";
import {CommonModule} from "@angular/common";

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
