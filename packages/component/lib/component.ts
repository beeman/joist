import { Provider } from '@joist/di';

export const COMPONENT_DEF_KEY = 'componentDef';

export interface RenderCtx<T = unknown> {
  state: T;
  run: (event: string, ...payload: any) => (e: Event) => void;
  dispatch: (eventName: string, init?: CustomEventInit) => () => void;
  host: HTMLElement;
}

export type RenderDef<T> = (ctx: RenderCtx<T>) => unknown;

export interface ComponentDef<T> {
  tagName?: string;
  shadowDom?: 'open' | 'closed';
  render?: RenderDef<T>;
  state?: T;
  providers?: Provider<any>[];
}

export function getComponentDef<T>(provider: any): ComponentDef<T> {
  return provider[COMPONENT_DEF_KEY] || {};
}

export function component<T>(componentDef: ComponentDef<T> = {}) {
  return function (component: CustomElementConstructor) {
    Object.defineProperty(component, COMPONENT_DEF_KEY, {
      get() {
        return componentDef;
      },
    });

    if (componentDef.tagName) {
      customElements.define(componentDef.tagName, component);
    }
  };
}
