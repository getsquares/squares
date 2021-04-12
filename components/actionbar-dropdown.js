class ActionbarDropdown extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    this.innerHTML = `
      <div data-actionbar-dropdown class="flex flex-col gap-4 p-4 bg-gray-100 border-t">
        <div data-actionbar-title class="text-xs font-bold uppercase"></div>
        <div data-actionbar-dropdown-content></div>
      </div>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "title") return;
    if (oldValue !== newValue) {
      console.log(newValue);
      document.querySelector("[data-actionbar-title]").innerHTML = newValue;
    }
  }
}

customElements.define("actionbar-dropdown", ActionbarDropdown);
