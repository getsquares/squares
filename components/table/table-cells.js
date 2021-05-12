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

    const el_first_ring = $("cell-ring", this.closest("table-cells"));
    if (!el_first_ring) return;

    el_first_ring.setAttribute("state", "active");
  }

  template() {
    const main = this.closest("pane-main");
    const this_data =
      data[`${main.getAttribute("database")} ${main.getAttribute("table")}`];
    const cols = this_data.cols_order;

    let html = "";
    let table_cols = "";

    this_data.rows.forEach((row) => {
      table_cols = "";
      cols.forEach((item) => {
        const value = row[item];
        table_cols += `<table-cell value="${value}"></table-cell>`;
      });
      html += `
        <table-row>
          <row-select></row-select>
          ${table_cols}
        </table-row>
      `;
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
        <table-row class="contents row-new">
          <row-select></row-select>
          ${html_first}
        </table-row>
      </template>
    `;
    return html_first;
  }

  deactivateCells() {
    this.deactivateCellEdit();
    this.deactivateCellRing();
  }

  deactivateCellRing() {
    const el_cell = $(
      'cell-ring[state="active"], cell-ring[state="edit"]',
      this
    );

    if (!el_cell) return;

    el_cell.setAttribute("state", "default");
  }

  deactivateCellEdit() {
    const el_edit = $("cell-edit[active]", this);

    if (!el_edit) return;

    el_edit.innerHTML = "";
    el_edit.removeAttribute("active");
  }
}

customElements.define("table-cells", TableCells);
