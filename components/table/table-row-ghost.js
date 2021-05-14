class TableRowGhost extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["value"];
  }

  connectedCallback() {
    this.setAttribute("hidden", "");
    this.innerHTML = this.template();
  }

  template() {
    const table_cells = this.templateTableCells();
    return this.templateFirstTableRow(table_cells);
  }

  templateTableCells() {
    const main = this.closest("pane-main");
    const this_data =
      data[`${main.getAttribute("database")} ${main.getAttribute("table")}`];
    let html = "";

    this_data.cols_order.forEach((name) => {
      const default_value = this.parseDefault(this_data, name);
      html += this.templateTableCell(this_data, name, default_value);
    });

    return html;
  }

  templateFirstTableRow(html_first) {
    return `
      <template data-first>
        <table-row class="contents row-new">
          <row-select></row-select>
          ${html_first}
        </table-row>
      </template>
    `;
  }

  templateTableCell(this_data, name, default_value) {
    return `
      <table-cell
        nullable="${this.isNullable(this_data, name)}"
        value="${default_value}"
        null="${this.isNullable(this_data, name)}">
      </table-cell>
    `;
  }

  parseDefault(this_data, name) {
    let value = this_data.cols[name].meta.Default;

    value = this.trimNull(value);
    value = this.trimQuotes(value);

    return value;
  }

  trimNull(value) {
    if (value !== null) return value;
    return "";
  }

  trimQuotes(value) {
    if (!value.startsWith("'")) return value;
    if (!value.endsWith("'")) return value;

    return value.slice(1, -1);
  }

  isNullable(this_data, name) {
    return this_data.cols[name].meta.Null == "YES" ? "true" : "false";
  }
}

customElements.define("table-row-ghost", TableRowGhost);
