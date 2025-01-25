import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { from, map, Observable } from 'rxjs';
import '@ui5/webcomponents-icons/dist/download-from-cloud.js';

@Component({
  standalone: true,
  selector: 'app-container-overview',
  imports: [CommonModule, Ui5WebcomponentsModule],
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AccountOverviewComponent implements OnInit {
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;

  gatewayUrl: string = '';

  kcpCA = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCakNDQWU2Z0F3SUJBZ0lRUnRVR1lycTIyR3NYYjFJbWJ0MFNKakFOQmdrcWhraUc5dzBCQVFzRkFEQWQKTVJzd0dRWURWUVFERXhKdmNHVnViV1p3TFd0amNDMXdhMmt0WTJFd0hoY05NalV3TVRFd01UYzFORE13V2hjTgpNelV3TVRBNE1UYzFORE13V2pBZE1Sc3dHUVlEVlFRREV4SnZjR1Z1Yldad0xXdGpjQzF3YTJrdFkyRXdnZ0VpCk1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRRGU3TEwxUW9nWThzL1RlbU1UbGprVmhXV0MKWXFBZU1jZkVMeC8zc2c4d0pJUjd3QmJIeThlNmpacE5hSUlLNGpGeERYQUppWG1rRitCeXdJU3lGbTZqTFVyZwpVbjdCR2ZXc05Ga2hudk9URUtUMS83RFhhVDdxNTVmSHZFNGQ5aWZBQ0thTTBvQ3R0S0trU1N6TS9QK2ZCU01LCkF1YW5BSVF4SUxDUFV4d0tTQW4wZ2JrOEhVVzU0U25MSENBQnlMQ1l0MW5BQlF3bWg1ZENmTjQrMWlSemJ2a0IKQWozUGdRRno1ZkJsNzd2cFRLakl5M1FvMk93a2ZqU0htWU91angxdEphNVRHcHBqK2tlSzNtRGJ6eTc4VytQcQpvNnBKVlJxQTNhUUxyb0MyK0ZxdlpMSmlpYklaY3pLWVc3THZvejEvUnJrVm5sTXJYejdGWDF6T21nOUJBZ01CCkFBR2pRakJBTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQQmdOVkhSTUJBZjhFQlRBREFRSC9NQjBHQTFVZERnUVcKQkJTY1gzeURlekpNVDZUTk9SelQwU2k2bmRLRk1UQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFxeTV4Yndlagppa3I3QldKdnNnTkJid1NGd3k4TTVXRVVCNGZWcGtZMW9yRDlDN2VhTDBhWk1Od0NMVFBMRjdCb3RVTlRzYlc0CmtnSFZaZytLRVo0dVBTSGJzeDI4MUFDb2lmbXR3S0EwaUVrUmNaQktlYzhhYm1qQ05WVUwzdEJIN0pXWEtxUXEKWjFWcmw4blliYTNwZkR3YWtaOFlzS016VUhiV3ZsbGl6dVRCRGg4czFXYjc4TnhZQzNqdnB3ZGtXNGswS0dFQgo4Z2l6VU9SRXMrOFBzUnAwNVpVK1VLV2dlTUxxdDc5aWh4M0taWHdDMXRmZzhwVDhzb1Z4Y0g0Y216cXkrakhXCmsyeU9OZEJJN2tZODJaY3NUeFgrdkZxY2ZlSFFlNkNUYlB0T2xyUjF1T0VlcStjSHZ5bVFFQjNCNEltK0FZaUcKMldXeDVTM2o3MzZyYXc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==';
  kubeconfigTemplate = `apiVersion: v1
kind: Config
clusters:
- name: <cluster-name>
  cluster:
    certificate-authority-data: <ca-data>
    server: "https://kcp.api.portal.cc-poc-one.showroom.apeirora.eu/clusters/<server-url>"
contexts:
- name: <cluster-name>
  context:
    cluster: <cluster-name>
    user: <cluster-name>
current-context: <cluster-name>
users:
- name: <cluster-name>
  user:
    token: <token>
    # exec:
    #   apiVersion: client.authentication.k8s.io/v1beta1
    #   args:
    #   - oidc-login
    #   - get-token
    #   - --oidc-issuer-url=https://auth.portal.cc-poc-one.showroom.apeirora.eu/realms/openmfp
    #   - --oidc-client-id=openmfp
    #   - --oidc-extra-scope=email
    #   - --oidc-extra-scope=groups
    #   command: kubectl
    #   env: null
    #   interactiveMode: IfAvailable
`;

  httpbins$: Observable<any> = new Observable<any>();
  account$: Observable<any> = new Observable<any>();

  ngOnInit() {
    this.gatewayUrl = this.context.portalContext.crdGatewayApiUrl;
    if (this.context.accountId) {
      this.gatewayUrl = this.gatewayUrl.replace(
        '/graphql',
        `:${this.context.accountId}/graphql`
      );
    }

    this.httpbins$ = from(
      this.makeGraphQLRequest(
        this.gatewayUrl,
        `{
      orchestrate_cloud_sap {
        HttpBins {
          metadata {
            name
          }
          status {
            ready
            url
          }
        }
      }
    }`
      )
    ).pipe(map((res) => res.data.orchestrate_cloud_sap.HttpBins));

    this.account$ = from(
      this.makeGraphQLRequest(
        this.context.portalContext.crdGatewayApiUrl,
        `{
      core_openmfp_io {
        Account(name: "${this.context.accountId}", namespace: "default") {
          metadata {
            name
          }
          spec {
            displayName
            description
          }
        }
    }
      }`
      )
    )
      .pipe(map((res) => res.data.core_openmfp_io.Account))
  }

  get kcpPath() {
    return (
      new URL(this.gatewayUrl).pathname
        .split('/')
        .filter((s) => s.includes(':'))?.[0] ?? ''
    );
  }

  makeGraphQLRequest(gatewayUrl: string, query: string) {
    return fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.context.token}`,
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
  }

  async downloadKubeconfig() {
    const kubeconfig = this.renderKubeconfig(
      this.context.accountId,
      this.kcpPath,
      this.kcpCA,
      this.context.token
    );

    const blob = new Blob([kubeconfig], { type: 'application/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'kubeconfig.yaml';
    a.click();
  }

  private renderKubeconfig(
    clusterName: string,
    serverUrl: string,
    caData: string,
    token: string
  ) {
    return this.kubeconfigTemplate
      .replaceAll('<cluster-name>', clusterName)
      .replaceAll('<server-url>', serverUrl)
      .replaceAll('<ca-data>', btoa(caData))
      .replaceAll('<token>', token);
  }
}
