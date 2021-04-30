class PaneColumns extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-4", "flex", "hidden", "text-sm");
    this.innerHTML = this.template("Columns");
  }

  checkboxes() {
    return this.partCheckbox("test23", true) + this.partCheckbox("test");
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
          this.classesActivate();
        } else {
          this.classesDeactivate();
        }
      }
    }
  }

  classesActivate(el = this) {
    el.classList.remove("hidden");
  }

  classesDeactivate(el = this) {
    el.classList.add("hidden");
  }

  partCheckbox(name, checked) {
    return `
    <checkbox-item class="bg-gray-50 px-3 py-1.5 rounded border border-gray-200" name="${name}" label="${name}" checked="${checked}"></checkbox-item>
    `;
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("pane-columns", PaneColumns);
