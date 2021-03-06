import { JoistElement, component, get } from '@joist/component';
import { template, html } from '@joist/component/lit-html';
import { Route, RouteCtx } from '@joist/router';

const routes: Route[] = [
  {
    path: '/foo/bar',
    component: () => import('./page-2.element').then((m) => m.Page2Element),
  },
];

export interface AppState {
  title: string;
}

@component<AppState>({
  tagName: 'page-1-element',
  state: {
    title: 'Page1Component Works!',
  },
  render: template(({ state }) => {
    return html`
      <h2>${state.title}</h2>

      <router-link>
        <a href="/foo/bar">BAR</a>
      </router-link>

      <router-outlet .routes=${routes}></router-outlet>
    `;
  }),
})
export class Page1Element extends JoistElement {
  @get(RouteCtx)
  private route!: RouteCtx;

  connectedCallback() {
    super.connectedCallback();

    console.log(this.route.value);

    this.route.onChange((ctx) => {
      console.log(ctx);
    });
  }
}
