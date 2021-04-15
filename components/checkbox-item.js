class CheckboxItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const label = this.getAttribute("label");
    const checked = this.getAttribute("checked") == "true" ? " checked" : "";

    this.innerHTML = `
      <label class="flex select-none items-center gap-2">
        <input
          type="checkbox"
          class="w-5 h-5 border border-gray-300 text-gray-800 focus:ring-0 focus:ring-offset-0"
          name="${name}"
          ${checked}
        />
        ${label}
      </label>
    `;
  }
}

customElements.define("checkbox-item", CheckboxItem);
