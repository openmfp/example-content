import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
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

  private buildContentConfiguration(name: string) {
    return `{
  "name": "${name}",
  "creationTimestamp": "2022-05-17T11:37:17Z",
  "luigiConfigFragment": [
    {
      "data": {
        "nodes": [
          {
            "pathSegment": "${name}",
            "label": "${name}",
            "entityType": "main.account",
            "loadingIndicator": {
              "enabled": false
            },
            "url": "https://fiddle.luigi-project.io/examples/microfrontends/multipurpose.html",
            "context": {
              "title": "Welcome to the ${name} extension",
              "content": " "
            }
          },{
            "entityType": "main.account.dashboard::compound",
            "url": "https://luigiwebcomponents.gitlab.io/ms-adaptive-cards/main.js",
            "context": {
              "style": "padding: 1rem",
              "disableBorder": true,
              "card": {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "speak": "<s>The forecast for Seattle January 20 is mostly clear with a High of 51 degrees and Low of 40 degrees</s>",
                "body": [
                  {
                    "type": "TextBlock",
                    "text": "${name}",
                    "size": "large",
                    "isSubtle": true,
                    "wrap": true
                  },
                  {
                    "type": "TextBlock",
                    "text": "Mon, Nov 4, 2019 6:21 PM",
                    "spacing": "none",
                    "wrap": true
                  },
                  {
                    "type": "ColumnSet",
                    "columns": [
                      {
                        "type": "Column",
                        "width": "auto",
                        "items": [
                          {
                            "type": "Image",
                            "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png",
                            "size": "small",
                            "altText": "Mostly cloudy weather"
                          }
                        ]
                      },
                      {
                        "type": "Column",
                        "width": "auto",
                        "items": [
                          {
                            "type": "TextBlock",
                            "text": "46",
                            "size": "extraLarge",
                            "spacing": "none",
                            "wrap": true
                          }
                        ]
                      },
                      {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                          {
                            "type": "TextBlock",
                            "text": "Hi 50",
                            "horizontalAlignment": "left",
                            "wrap": true
                          },
                          {
                            "type": "TextBlock",
                            "text": "Lo 41",
                            "horizontalAlignment": "left",
                            "spacing": "none",
                            "wrap": true
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            },
            "layoutConfig": {
              "row": "1",
              "column": "1 / -1"
            }
          }
        ]
      }
    }
  ]
}`;
  }

  public getAccountDetails(name: string) {
    return this.apollo.query<any>({
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
    }).pipe(map((res) => res.data?.coreOpenmfpIo?.account ?? {}));
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
