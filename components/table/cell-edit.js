class CellEdit extends HTMLElement {
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
    let html_null = "";
    if (this.isNullable()) {
      html_null = `
        <label class="flex gap-2 items-center">
          <input
            type="checkbox"
            class="checkstyle-white form-checkbox"
            ${this.value === null ? "checked" : ""}
          >
          <div class="italic">NULL</div>
        </label>
      `;
    }
    let html = `
      ${html_null}
      <field-text></field-text>
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
    // Jämför mot original null
    // Om olika, spara null i set som is_null: true eller is_null: false
    // Om värde saknas, lägg till från original

    $("label:first-child input", this).on("change", (e) => {
      const new_preview = get.new.param(this, "preview");
      const new_value = get.new.param(this, "value");
      console.log(new_preview);
      console.log(new_value);

      const Update = new UpdateClass();
      Update.initByContext(this);

      //const origial_value = Update.old_value;

      const checked = e.currentTarget.checked;
      $("preview-null", this.parentElement).hidden = !checked;
      $("preview-value", this.parentElement).hidden = checked;

      console.log(Update.data);

      console.log(Update.isUniqueNull());

      if (Update.isUniqueNull()) {
        Update.storeAddIsNull(checked);
      }
    });
  }
}

customElements.define("cell-edit", CellEdit);
