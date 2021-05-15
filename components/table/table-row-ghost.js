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
    const table_name = table.get(this);
    const this_data = data[table_name];
    let html = "";

    temp["insert"][table_name] = {
      defaults: {},
      data: [],
    };

    this_data.cols_order.forEach((name) => {
      const nullable = this.isNullable(this_data, name);
      const value = this.parseDefault(this_data, name);

      if (this_data.meta.id !== name) {
        temp["insert"][table_name]["defaults"][name] =
          nullable == "true" ? "" : value;
      }

      html += this.templateTableCell(nullable, value, name);
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

  templateTableCell(nullable, value, column) {
    return `
      <table-cell
        nullable="${nullable}"
        value="${value}"
        null="${nullable}"
        column="${column}">
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
