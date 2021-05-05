class TableCells extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("contents");
    this.innerHTML = this.template();
  }

  template() {
    const main = this.closest("pane-main");
    const this_data =
      data[`${main.getAttribute("database")} ${main.getAttribute("table")}`];
    const cols = this_data.cols_order;
    let html = "";

    this_data.rows.forEach((row) => {
      html += `
        <div class="contents">
          <row-select></row-select>`;
      cols.forEach((item) => {
        const value = row[item];
        html += `<table-cell value="${value}"></table-cell>`;
      });
      html += `</div>`;
    });

    return html;
  }
}

customElements.define("table-cells", TableCells);
