import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpBinService } from '../services/httpbin-service.service';
import { HttpBin } from '../models/httpbins';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FundamentalNgxCoreModule,
  IllustratedMessageModule,
} from '@fundamental-ngx/core';
import { linkManager } from '@luigi-project/client';

@Component({
  selector: 'app-httpbin',
  standalone: true,
  imports: [CommonModule, FundamentalNgxCoreModule, IllustratedMessageModule],
  templateUrl: './httpbin.component.html',
  styleUrl: './httpbin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpBinComponent implements OnInit {
  constructor(
    private readonly httpbinService: HttpBinService,
  ) {}

  sceneConfig = {
    scene: {
      url: 'assets/images/sapIllus-Scene-NoSearchResults.svg',
      id: 'sapIllus-Scene-NoSearchResults',
    },
    dialog: {
      url: 'assets/images/sapIllus-Dialog-NoSearchResults.svg',
      id: 'sapIllus-Dialog-NoSearchResults',
    },
  };

  httpbins: Observable<HttpBin[]> = new BehaviorSubject([]);

  ngOnInit(): void {
    this.httpbins = this.httpbinService.subscribeBins();
    this.httpbins.subscribe((bins) => {
      console.log(bins);
    });
  }

  async navigateToHttpBin($event: MouseEvent, item: HttpBin) {
    $event.stopPropagation();
    linkManager().navigate(`${await linkManager().getCurrentRoute()}/${item.metadata.name}`);
  }

  async openCreateHttpBinDialog() {
    linkManager().openAsModal(`${await linkManager().getCurrentRoute()}-create`, {
      title: 'Create HttpBin',
      width: '450px',
      height: '310px',
    });
  }
}
