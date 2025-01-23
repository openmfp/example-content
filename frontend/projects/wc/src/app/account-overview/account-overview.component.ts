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
    const { data } = await this.makeGraphQLRequest(
      this.gatewayUrl,
      `query {
          core {
            ConfigMap(name: "kube-root-ca.crt", namespace: "default") {
              data
            }
          }
        }`
    );

    const u = new URL(this.gatewayUrl);
    const kubeconfig = this.renderKubeconfig(
      this.context.accountId,
      this.kcpPath,
      data.core.ConfigMap.data['ca.crt'],
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
