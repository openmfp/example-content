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
        An entity is the basic building block of configuration. The configuration consists of <b>nodes</b> and <b>texts</b>.

        In this example, <b>{{firstExampleTitle}}</b> will be replaced with the value of <b>"firstExampleTitle"</b> according to the language(locale).

        The overall structure consists of two nodes. The top node, starting with <b>"entityType": "main"</b>, is a definition for <b>"entity-definition"</b> page,
        it is a sub-page for an entity that is not available here but contains <b>"defineEntity"</b> key with <b>"id": "main"</b>. <b>"compound"</b> informs
        us about the page content.

        The content itself is defined in another entity starting with <b>"entityType": "main.first-example::compound"</b>. The entity type refers to the parent node.
        <b>"url"</b> points to the component and <b>"context"</b> lets you pass additional information to the component.
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
      header: 'Iframe based Micro Frontend integration',
      label: `
        This example showcases the configuration of an entity that allows adding a Micro Frontend via an iframe.

        The integration entity requires <b>"requiredIFramePermissions"</b>, <u>consider removing unnecessary permissions</u>.

        Another important element in this example is the <b>"virtualTree"</b> parameter, which activates navigation around the microservice.
        <b>"navigationContext"</b> allows you to set the navigation base url. In this way, you will notice that the browser URL gets updated according
        to the microservice's internal routing as well as the window content.

        Loading external services may take a while, so you can use a <b>"loadingIndicator"</b> to let the user know about the processing.
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
      header: 'Left side menu navigating',
      label: `
        The configuration for two entities allows you to find two tabs in the left-side menu: <i>"First Tab"</i> and <i>"Second Tab"</i>. Both definitions
        were placed as part of the children array, meaning both are sub-sites of the main entity. This dependency defines the path as follows: <b>"/home/first"</b>.

        To hide a tab in the navigation panel, you can use </b>"hideFromNav": true</b>, or remove the </b>"label"</b>. This effect may be useful if you want to keep
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
                    "title": "Third page",
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
        An entity can have a definition for a Web Component. The <b>"urlSuffix"</b> points to the component, and <b>"content"</b> passes configuration data
        over to the component. In this example, the component is registered under the name <i>"account-overview"</i>. To use the component,
        you should add the <b>"webcomponent"</b> key with <b>"selfRegistered": true;</b> otherwise, the interpreter won't recognize your definition
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
