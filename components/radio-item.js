class RadioItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const label = this.getAttribute("label");
    const checked = this.getAttribute("checked") == "true" ? " checked" : "";

    this.innerHTML = `
      <label class="flex select-none items-center gap-2">
        <input type="radio" class="w-5 h-5 text-white" name="${name}" ${checked} />
        ${label}
      </label>
    `;
  }
}

customElements.define("radio-item", RadioItem);
