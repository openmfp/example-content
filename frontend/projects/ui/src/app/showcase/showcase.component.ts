import { Component } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

interface ShowcasePanel {
  header: string;
  label: string;
  example: string;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [Ui5WebcomponentsModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {

  showcaseItems: ShowcasePanel[] = [
    {
      header: 'Definition of an Entity',
      label: `Entity is basic building block of configuration, here is example how definition of entity should look like. Configuration consist of nodes and texts.`,
      example: `
        {
          "name": "overview",
          "creationTimestamp": "",
          "luigiConfigFragment": {
            "data": {
              "nodes": [
                {
                  "entityType": "global",
                  "pathSegment": "showcase",
                  "label": "Overview",
                  "icon": "business-one",
                  "tabNav": true,
                  "hideFromNav": false,
                  "defineEntity": {
                    "id": "main"
                  },
                  "compound": {
                  }
                },
                {
                  "entityType": "main::compound",
                  "url": "https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js",
                  "context": {
                    "border": "shadow",
                    "title": "{{showcase}}",
                    "description": ""
                  }
                }
              ],
              "texts": [
                {
                  "locale": "",
                  "textDictionary": {
                    "showcase": "Showcase page"
                  }
                },
                {
                  "locale": "en",
                  "textDictionary": {
                    "showcase": "Showcase page"
                  }
                }
              ]
            }
          }
        }
      `
    },
    {
      header: 'Iframe based Micro Frontend integration',
      label: 'Example showcasing entity configuration letting add Micro Frontend via iframe. Integration entity requires "requiredIFramePermissions".',
      example: `
        {
          "name": "micro-frontend-sample",
          "creationTimestamp": "",
          "luigiConfigFragment": {
            "data": {
              "nodes": [
                {
                  "entityType": "global",
                  "pathSegment": "showcase",
                  "label": "Overview",
                  "virtualTree": true,
                  "url": "https://example.com/",
                  "icon": "home",
                  "loadingIndicator": {
                    "enabled": false
                  },
                  "requiredIFramePermissions": {
                    "sandbox": [
                      "allow-forms",
                      "allow-modals",
                      "allow-popups",
                      "allow-popups-to-escape-sandbox",
                      "allow-same-origin",
                      "allow-scripts",
                      "allow-download"
                    ],
                    "allow": [
                      "clipboard-read",
                      "clipboard-write"
                    ]
                  }
                }
              ]
            }
          }
        }
      `
    },
    {
      header: 'Navigating in the virtualtree',
      label: `Configuration for two entities lets you find two tabs available "First Tab" and "Second Tab".`,
      example: `
        {
          "name": "overview",
          "creationTimestamp": "",
          "luigiConfigFragment": {
            "data": {
              "nodes": [
                {
                  "entityType": "global",
                  "pathSegment": "showcase",
                  "hideFromNav": true,
                  "defineEntity": {
                    "id": "main"
                  },
                  "children": [
                    {
                      "pathSegment": "first",
                      "label": "First Tab",
                      "defineEntity": {
                        "id": "first"
                      },
                      "compound": {
                      }
                    },
                    {
                      "pathSegment": "second",
                      "label": "Second Tab",
                      "defineEntity": {
                        "id": "second"
                      },
                      "compound": {
                      }
                    }
                  ]
                },
                {
                  "entityType": "main.first::compound",
                  "url": "https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js",
                  "context": {
                    "border": "shadow",
                    "title": "First page",
                    "description": ""
                  }
                },
                {
                  "entityType": "main.second::compound",
                  "url": "https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js",
                  "context": {
                    "border": "shadow",
                    "title": "Second page",
                    "description": ""
                  }
                }
              ]
            }
          }
        }
      `
    },
    {
      header: 'Integrate Web Component into page',
      label: 'explanation',
      example: `
        Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna.
        Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
        commodo Lorem laboris nisi Lorem.
      `
    },
  ]
}
