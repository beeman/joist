import { expect } from '@open-wc/testing';

import { TodoFormElement } from './todo-form.element';

describe('TodoFormElement', () => {
  let el: TodoFormElement;

  beforeEach(() => {
    el = new TodoFormElement();

    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  it('should dispatch the correct value', (done) => {
    const input = el.querySelector('input') as HTMLInputElement;
    const submit = el.querySelector('button') as HTMLButtonElement;

    input.value = 'Hello World';

    el.addEventListener('add_todo', (e) => {
      const event = e as CustomEvent<string>;

      expect(event.detail).to.equal('Hello World');

      done();
    });

    submit.click();
  });
});
