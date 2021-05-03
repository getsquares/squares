class ColumnsX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-4", "flex", "text-sm");
    this.setAttribute("hidden", "");
    this.innerHTML = this.template("Columns");
  }

  checkboxes() {
    return `
      <columns-item name="alright" checked="true"></columns-item>
      <columns-item name="asd"></columns-item>
    `;
  }

  template(title) {
    return `
      <div class="flex flex-col gap-2 p-4 flex-1">
        <div class="font-bold">${title}</div>
        <div class="flex gap-2">
          ${this.checkboxes()}
        </div>
      </div>
      <pane-close hide="pane-columns"></pane-close>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }

  thisActivate() {
    this.classList.remove("hidden");
  }

  thisDeactivate() {
    this.classList.add("hidden");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("columns-x", ColumnsX);
