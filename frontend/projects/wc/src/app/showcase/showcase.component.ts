import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';

interface ShowcasePanel {
  header: string;
  label: string;
  example: string;
  linkToExample?: string;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [Ui5WebcomponentsModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ShowcaseComponent implements OnChanges {
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  @Input() title = 'Showcase Overview';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      this.title = changes['context'].currentValue.title;
    }
  }

  show(pathSegment: string) {
    if(this.LuigiClient) {
      this.LuigiClient.linkManager().navigate(`/home/${pathSegment}`);
    }
  }

  showcaseItems: ShowcasePanel[] = [
    {
      header: 'Definition of an Entity',
      label: `Entity is basic building block of configuration, here is example how definition of entity should look like. Configuration consist of nodes and texts.`,
      linkToExample: "firstExample",
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
      linkToExample: "secondExample",
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
      linkToExample: "thirdExample",
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
      label: 'Entity can have definition for Web Component, "url" points to the component, "content" pass configuration data over to component. In this example component is registered under name "showcase"',
      linkToExample: "fourthExample",
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
                      "pathSegment": "overview",
                      "label": "Overview",
                      "icon": "home",
                      "defineEntity": {
                        "id": "overview"
                      },
                      "compound": {
                        "renderer": {
                          "use": "grid",
                          "config": {
                            "columns": "1fr 1fr 1fr 1fr"
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "entityType": "main.overview::compound",
                  "url": "https://example.com/main.js#showcase",
                  "context": {
                    "title": "Showcase"
                  },
                  "layoutConfig": {
                    "row": "1",
                    "column": "1 / -1"
                  },
                  "webcomponent": {
                    "selfRegistered": true
                  }
                }
              ]
            }
          }
        }
      `
    },
  ]
}
