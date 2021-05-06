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
    const database = this.closest("pane-main").getAttribute("database");
    const table = this.closest("pane-main").getAttribute("table");
    const data_cols_all = data[`${database} ${table}`].cols_all;
    const data_cols_active = data[`${database} ${table}`].cols_order;
    let html = "";

    data_cols_all.forEach((item) => {
      const checked = data_cols_active.includes(item);
      const checked_html = checked ? `checked="true"` : "";
      html += `<columns-item name="${item}" ${checked_html}></columns-item>`;
    });

    return html;
  }

  template(title) {
    return `
      <div class="flex flex-col gap-2 p-4 flex-1">
        <div class="font-bold">${title}</div>
        <div class="flex gap-4">
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
