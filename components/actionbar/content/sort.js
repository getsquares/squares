class ActionbarSort2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex gap-4">
        <radio-item name="test" label="Hegllo" checked="true"></radio-item>
        <radio-item name="test" label="Hegllo" checked="true"></radio-item>
      </div>
    `;
  }
}

customElements.define("actionbar-sort2", ActionbarSort2);
