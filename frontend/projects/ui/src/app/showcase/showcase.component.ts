import { Component } from '@angular/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { ShowcasePanelComponent } from './showcase-panel/showcase-panel.component';
import { ShowcasePanel } from './showcase-panel/showcase-panel';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [Ui5WebcomponentsModule, ShowcasePanelComponent],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {

  showcaseItems: ShowcasePanel[] = [
    {
      header: 'Definition of an Entity',
      label: `Typical luigiConfigFragment contains viewGroup object and array of nodes as well as array of texts.`,
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
      label: 'explanation 2',
      example: `
      Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna.
      Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
      commodo Lorem laboris nisi Lorem.`
    },
    {
      header: 'Navigating in the virtualtree',
      label: `In this example you can see example configuration letting you navigate through the pages of the virtual tree.
        You will find two tabs available "First Tab" and "Second Tab".`,
      example: `
        {
          "name": "overview",
          "creationTimestamp": "",
          "luigiConfigFragment": {
            "data": {
              "nodes": [
                {
                  "entityType": "global",
                  "pathSegment": "home",
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
      label: 'explanation 4',
      example: `
      Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna.
      Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
      commodo Lorem laboris nisi Lorem.`
    },
  ]
}
