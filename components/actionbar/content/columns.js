class ActionbarColumns2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex gap-8">
        <checkbox-item name="test" label="id" checked="true"></checkbox-item>
        <checkbox-item name="test" label="title" checked="true"></checkbox-item>
        <checkbox-item name="test" label="slug" checked="true"></checkbox-item>
        <checkbox-item name="test" label="description" checked="true"></checkbox-item>
        <checkbox-item name="test" label="categories" checked="true"></checkbox-item>
      </div>
    `;
  }
}

customElements.define("actionbar-columns2", ActionbarColumns2);
