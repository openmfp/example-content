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
