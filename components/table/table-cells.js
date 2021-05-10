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

    return this.templateFirst(this_data) + html;
  }

  templateFirst(this_data) {
    let html_first = "";

    this_data.cols_order.forEach((item) => {
      html_first += `
        <table-cell value="null"></table-cell>
      `;
    });

    html_first = `
      <template data-first>
        <div class="contents row-add">
          <row-select></row-select>
          ${html_first}
        </div>
      </template>
    `;
    return html_first;
  }

  addRow() {
    const row = $("[data-first]", this).innerHTML;

    $("[data-first]", this).insertAdjacentHTML("afterend", row);
  }
}

customElements.define("table-cells", TableCells);
