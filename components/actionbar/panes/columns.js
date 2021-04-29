class PaneColumns extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add(
      "gap-4",
      "bg-white",
      "flex",
      "hidden",
      "mt-1",
      "text-sm",
      "rounded"
    );
    this.innerHTML = this.template("Columns");
  }

  checkboxes() {
    return this.partCheckbox("test23", true) + this.partCheckbox("test");
  }

  template(title) {
    return `
      <div class="flex flex-col gap-4 p-4 flex-1">
        <div class="font-bold">${title}</div>
        <div class="flex gap-8">
          ${this.checkboxes()}
        </div>
      </div>
      <pane-close hide="pane-columns"></pane-close>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log("hit");
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
    <checkbox-item name="${name}" label="${name}" checked="${checked}"></checkbox-item>
    `;
  }

  activate() {
    console.log("activate");
    this.setAttribute("active", "true");
  }

  deactivate() {
    console.log("123");
    this.removeAttribute("active");
  }
}

customElements.define("pane-columns", PaneColumns);
