import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuigiClient } from '@luigi-project/client/luigi-element';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { SafeHtmlPipe } from '../../shared/safe-html.pipe';
import '@ui5/webcomponents-icons/dist/detail-less.js';
import '@ui5/webcomponents-icons/dist/detail-more.js';
import '@ui5/webcomponents-icons/dist/hide.js';
import '@ui5/webcomponents-icons/dist/show.js';
import '@ui5/webcomponents-icons/dist/example.js';

interface ShowcasePanel {
  header: string;
  label: string;
  example: string;
  linkToExample?: string;
  isCodeVisible?: boolean;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [Ui5WebcomponentsModule, SafeHtmlPipe],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ShowcaseComponent {
  @Input() LuigiClient?: LuigiClient;
  @Input() context?: any;
  showAllCode = false;
  title = "Overview of Examples";

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      this.title = changes['context'].currentValue.title;
    }
  }

  toggleShowAllCodes() {
    this.showAllCode = !this.showAllCode;
    this.showcaseItems.forEach(item => {
      item.isCodeVisible = this.showAllCode;
    });
  }

  showExample(showcaseItems: ShowcasePanel) {
    if(this.LuigiClient) {
      window.open(`/home/${showcaseItems.linkToExample}`, '_blank');
    }
  }

  toggleCode(showcaseItems: ShowcasePanel) {
    showcaseItems.isCodeVisible = !showcaseItems.isCodeVisible;
  }

  showcaseItems: ShowcasePanel[] = [
    {
      header: 'Definition of an Entity',
      label: `
        An entity is the basic building block of configuration. The configuration consists of nodes and texts.

        In this example, <code>{{firstExampleTitle}}</code> will be replaced with the value of <code>"firstExampleTitle"</code> according to the language(locale).

        The overall structure consists of two nodes. The top node, starting with <code>"entityType": "main"</code>, is a definition for "entity-definition" page,
        it is a sub-page for an entity that is not available here but contains <code>"defineEntity"</code> key with <code>"id": "main"</code>. <code>"compound"</code> informs
        us about the page content.

        The content itself is defined in another entity starting with <code>"entityType": "main.first-example::compound"</code>. The entity type refers to the parent node.
        <code>"url"</code> points to the component and <code>"context"</code> lets you pass additional information to the component.
      `,
      linkToExample: "entity-definition",
      example: `
        {
          "name": "entity-definition-example",
          "creationTimestamp": "",
          "luigiConfigFragment": {
            "data": {
              "nodes": [
                {
                  "entityType": "main",
                  "pathSegment": "entity-definition",
                  "hideFromNav": true,
                  "defineEntity": {
                    "id": "entity-definition"
                  },
                  "compound": {
                    "renderer": {
                      "use": "grid",
                      "config": {
                        "columns": "1fr 1fr 1fr 1fr"
                      }
                    }
                  }
                },
                {
                  "entityType": "main.entity-definition::compound",
                  "url": "https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js",
                  "context": {
                    "border": "shadow",
                    "title": "{{firstExampleTitle}}",
                    "description": "{{firstExampleDescription}}"
                  }
                }
              ],
              "texts": [
                {
                  "locale": "",
                  "textDictionary": {
                    "firstExampleTitle": "Definition of an Entity",
                    "firstExampleDescription": "Entity is basic building block of configuration."
                  }
                },
                {
                  "locale": "en",
                  "textDictionary": {
                    "firstExampleTitle": "Definition of an Entity",
                    "firstExampleDescription": "Entity is basic building block of configuration."
                  }
                }
              ]
            }
          }
        }
      `
    },
    {
      header: 'Iframe based Micro Frontend Integration',
      label: `
        This example showcases the configuration of an entity that allows adding a Micro Frontend via an iframe.

        The integration entity requires <code>"requiredIFramePermissions"</code>, consider removing unnecessary permissions.

        Another important element in this example is the <code>"virtualTree"</code> parameter, which activates navigation around the microservice.
        <code>"navigationContext"</code> allows you to set the navigation base url. In this way, you will notice that the browser URL gets updated according
        to the microservice's internal routing, as well as the window content.

        Loading external services may take a while, so you can use a <code>"loadingIndicator"</code> to let the user know about the processing.
      `,
      linkToExample: "micro-frontend-iframe",
      example: `
        {
          "name": "micro-frontend-iframe-example",
          "creationTimestamp": "",
          "luigiConfigFragment": {
            "data": {
              "nodes": [
                {
                  "entityType": "main",
                  "pathSegment": "micro-frontend-iframe",
                  "virtualTree": true,
                  "navigationContext": "showcase",
                  "urlSuffix": "/ui/example-content/ui/index.html#/showcase",
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
      header: 'Left Side Menu Navigating',
      label: `
        The configuration for two entities allows you to find two tabs in the left-side menu: "First Tab" and "Second Tab". Both definitions
        were placed as part of the children array, meaning both are sub-sites of the main entity. This dependency defines the path as follows: <code>"/home/first"</code>.

        To hide a tab in the navigation panel, you can use </code>"hideFromNav": true</code>, or remove the </code>"label"</code>. This effect may be useful if you want to keep
        the navigation functional without making it accessible from the navigation panel.
      `,
      example: `
        {
          "name": "left-side-navigation-example",
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
                    },
                    {
                      "pathSegment": "third",
                      "defineEntity": {
                        "id": "third"
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
                    "description": "This is first page"
                  }
                },
                {
                  "entityType": "main.second::compound",
                  "url": "https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js",
                  "context": {
                    "border": "shadow",
                    "title": "Second page",
                    "description": "This is second page"
                  }
                },
                {
                  "entityType": "main.third::compound",
                  "url": "https://luigiwebcomponents.gitlab.io/layouts/panelHeader.js",
                  "context": {
                    "border": "shadow",
                    "title": "Third Page",
                    "description": "This is third page"
                  }
                }
              ]
            }
          }
        }
      `
    },
    {
      header: 'Integrate Web Component Into a Page',
      label: `
        An entity can have a definition for a Web Component. The <code>"urlSuffix"</code> points to the component, and <code>"content"</code> passes configuration data
        over to the component. In this example, the component is registered under the name "account-overview". To use the component,
        you should add the <code>"webcomponent"</code> key with <code>"selfRegistered": true;</code> otherwise, the interpreter won't recognize your definition
        as a webcomponent setup.
      `,
      linkToExample: "web-component-integration",
      example: `
        {
          "name": "web-component-integration-example",
          "creationTimestamp": "",
          "luigiConfigFragment": {
            "data": {
              "nodes": [
                {
                  "entityType": "main",
                  "pathSegment": "web-component-integration",
                  "hideFromNav": true,
                  "defineEntity": {
                    "id": "web-component-integration"
                  },
                  "compound": {
                  }
                },
                {
                  "entityType": "main.web-component-integration::compound",
                  "urlSuffix": "/ui/example-content/wc/main.js#account-overview",
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
