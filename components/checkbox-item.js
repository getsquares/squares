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
        <input type="checkbox" class="form-checkbox w-4 h-4 rounded focus:outline-none focus:ring-0 focus:ring-offset-0 text-navy-600" name="${name}" ${checked} />
        ${label ? label : ""}
      </label>
    `;
  }
}

customElements.define("checkbox-item", CheckboxItem);
