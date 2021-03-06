class ColumnsX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("gap-2", "flex", "flex-col", "text-sm", "p-4");
    this.hidden = true;
    this.innerHTML = this.template("Columns");
  }

  checkboxes() {
    const db = this.closest("pane-main").getAttribute("database");
    const tb = this.closest("pane-main").getAttribute("table");
    const data = get.tb.items(db, tb);
    const data_cols_all = data.cols_all;
    const data_cols_active = data.cols_order;
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
      <div class="font-bold">${title}</div>
      <div class="flex gap-x-4 gap-y-px flex-wrap">
        ${this.checkboxes()}
      </div>
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
