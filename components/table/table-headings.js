class TableHeadings extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("z-40", "contents");

    this.innerHTML = this.template();
  }

  template() {
    const main = this.closest("pane-main");
    const this_data =
      data[`${main.getAttribute("database")} ${main.getAttribute("table")}`];
    const cols = this_data.cols_order;
    let html = `<table-heading-check></table-heading-check>`;

    cols.forEach((item) => {
      const col = this_data.cols[item];
      const key = col.config && col.config.id ? `key="true"` : "";
      html += `
        <table-heading title="${item}" fieldtype="${col.meta.Type}" ${key}></table-heading>
      `;
    });

    return html;
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      }
    }
  }*/
}

customElements.define("table-headings", TableHeadings);
