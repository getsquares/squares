class CellEditInline extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const { db, tb, col, row, index } = get.dom.cell.data(this);
    this.db = db;
    this.tb = tb;
    this.col = col;
    this.row = row;
    this.index = index;
  }

  populateEdit() {
    $("cell-preview", this.closest("table-cell")).hidden = true;

    let html_null = "";

    const table = get.tb.items(this.db, this.tb);
    var field_type = "text";
    if (table?.cols?.[this.col]?.config?.field !== undefined) {
      field_type = table?.cols?.[this.col]?.config?.field;
    }

    if (this.isNullable()) {
      html_null = `
        <label class="flex gap-2 items-center">
          <input
            type="checkbox"
            class="checkstyle-white form-checkbox"
            ${this.value === null ? "checked" : ""}
          >
          <div class="italic pr-3">NULL</div>
        </label>
      `;
    }
    let html = `
      <field-${field_type}></field-${field_type}>
      ${html_null}
    `;

    this.hidden = false;
    this.innerHTML = html;

    if (!this.isNullable()) return;

    this.onClickNull();
  }

  isNullable() {
    const col = get.col.data(this.db, this.tb, this.col);
    return col.meta.Null == "YES";
  }

  onClickNull() {
    $("label:first-of-type input", this).on("change", (e) => {
      const checked = e.currentTarget.checked;

      set.new.nulled(checked, e.currentTarget);

      $("preview-null", this.parentElement).hidden = !checked;
      $("preview-value", this.parentElement).hidden = checked;

      debug("cell", JSON.stringify(cellData(), null, 4), "textarea");
    });
  }
}

customElements.define("cell-edit-inline", CellEditInline);
