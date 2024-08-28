import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { number } from 'minifaker';
import { map } from 'rxjs/operators';

const createContentConfiguration = gql`
  mutation ($name: String!, $namespace: String!, $content: String) {
    coreOpenmfpIo {
      createContentconfiguration(
        metadata: { name: $name, namespace: $namespace }
        spec: {
          inlineConfiguration: { content: $content, contentType: "json" }
        }
      ) {
        metadata {
          name
        }
      }
    }
  }
`;

const deleteContentConfiguration = gql`
  mutation ($name: String!, $namespace: String!) {
    coreOpenmfpIo {
      deleteContentconfiguration(name: $name, namespace: $namespace)
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  constructor(private readonly apollo: Apollo) {}

  private generateChildren(name: string) {
    const length = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    return new Array(length).fill(0).map((_, idx) => ({
      pathSegment: `${name}/child/${idx}`,
      label: `Child ${name} ${idx}`,
      category: name,
      entityType: 'main.account',
      loadingIndicator: {
        enabled: false,
      },
      viewUrl:
        'https://content.d1.openmfp.dxp.k8s.ondemand.com/ui/example-content/index.html#/iron-core/compute',
      context: {
        title: `Welcome to the ${name} child extension`,
        content: ' ',
      },
    }));
  }

  private buildContentConfiguration(name: string) {
    return JSON.stringify({
      name: name,
      creationTimestamp: '2022-05-17T11:37:17Z',
      luigiConfigFragment: [
        {
          data: {
            nodes: [
              {
                pathSegment: name,
                label: name,
                entityType: 'main.account',
                loadingIndicator: {
                  enabled: false,
                },
                category: {
                  label: name,
                  icon: 'dimension',
                  collapsible: true,
                },
                url: 'https://content.d1.openmfp.dxp.k8s.ondemand.com/ui/example-content/index.html#/iron-core/compute',
                context: {
                  title: `Welcome to the ${name} extension`,
                  content: ' ',
                },
              },
              ...this.generateChildren(name),
              {
                entityType: 'main.account.dashboard::compound',
                url: 'https://luigiwebcomponents.gitlab.io/ms-adaptive-cards/main.js',
                context: {
                  title: 'Activated Services from Marketplace',
                  style: 'padding: 1rem',
                  disableBorder: true,
                  card: {
                    $schema:
                      'http://adaptivecards.io/schemas/adaptive-card.json',
                    type: 'AdaptiveCard',
                    version: '1.0',
                    speak:
                      '<s>The forecast for Seattle January 20 is mostly clear with a High of 51 degrees and Low of 40 degrees</s>',
                    body: [
                      {
                        type: 'TextBlock',
                        text: `${name}`,
                        size: 'large',
                        isSubtle: true,
                        wrap: true,
                      },
                      {
                        type: 'TextBlock',
                        text: 'Mon, Nov 4, 2019 6:21 PM',
                        spacing: 'none',
                        wrap: true,
                      },
                      {
                        type: 'ColumnSet',
                        columns: [
                          {
                            type: 'Column',
                            width: 'auto',
                            items: [
                              {
                                type: 'Image',
                                url: 'https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png',
                                size: 'small',
                                altText: 'Mostly cloudy weather',
                              },
                            ],
                          },
                          {
                            type: 'Column',
                            width: 'auto',
                            items: [
                              {
                                type: 'TextBlock',
                                text: `${number({
                                  min: 1,
                                  max: 99,
                                  float: false
                                })}`,
                                size: 'extraLarge',
                                spacing: 'none',
                                wrap: true,
                              },
                            ],
                          },
                          {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                              {
                                type: 'TextBlock',
                                text: `Hi ${number({
                                  min: 50,
                                  max: 99,
                                  float: false
                                })}`,
                                horizontalAlignment: 'left',
                                wrap: true,
                              },
                              {
                                type: 'TextBlock',
                                text: `Lo ${number({
                                  min: 1,
                                  max: 49,
                                  float: false
                                })}`,
                                horizontalAlignment: 'left',
                                spacing: 'none',
                                wrap: true,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                layoutConfig: {
                  column: 'auto',
                  row: 'auto',
                },
              },
            ],
          },
        },
      ],
    });
  }

  public getAccountDetails(name: string) {
    return this.apollo
      .query<any>({
        query: gql`
          query ($name: String!) {
            coreOpenmfpIo {
              account(name: $name, namespace: "demo-root") {
                status {
                  namespace
                }
              }
            }
          }
        `,
        variables: {
          name,
        },
      })
      .pipe(map((res) => res.data?.coreOpenmfpIo?.account ?? {}));
  }

  public enableContentConfiguration(
    configName: string,
    configNamespace: string
  ) {
    return this.apollo.mutate({
      mutation: createContentConfiguration,
      variables: {
        name: configName,
        namespace: configNamespace,
        content: this.buildContentConfiguration(configName),
      },
    });
  }

  public disableContentConfiguration(
    configName: string,
    configNamespace: string
  ) {
    return this.apollo.mutate({
      mutation: deleteContentConfiguration,
      variables: {
        name: configName,
        namespace: configNamespace,
      },
    });
  }
}
