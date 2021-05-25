class PaneMain extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  set db(value) {
    this.dbValue = value;
  }

  get db() {
    return this.dbValue;
  }

  set tb(value) {
    this.tbValue = value;
  }

  get tb() {
    return this.tbValue;
  }

  connectedCallback() {
    this.db = this.getAttribute("db");
    this.tb = this.getAttribute("tb");
    this.data = get.tb.items(this.db, this.tb);

    this.classList.add("flex", "flex-col", "overflow-auto", "flex-1");

    const grid_cols = this.gridCols();
    const grid_cols_class = `auto ${grid_cols.widths.join("px ")}px`;
    console.log(JSON.stringify(grid_cols_class));

    this.innerHTML = `
      <actions-x></actions-x>
      <div class="flex-1 flex overflow-auto">
        <div class="overflow-x-auto flex-1 my-4 border border-gray-200 rounded bg-white">
          <div class="flex-1 text-13" style="width: ${grid_cols.sum}px;">
            <div data-table class="grid gap-y-px bg-white" style="grid-template-columns: ${grid_cols_class};">
              <table-headings class="z-40 contents">
                <table-heading-check
                  class="sticky top-0 z-[600] flex bg-gray-100 heading-bkg left-0">
                  <label class="tp relative heading-bkg flex items-center bg-gray-100">
                    <input type="checkbox" class="form-checkbox checkstyle-white" name="test" />
                  </label>
                </table-heading-check>
                ${this.data.cols_order
                  .map((column_name) => {
                    const column_data = this.data.cols[column_name];

                    return `
                      <table-heading
                        class="tp heading-bkg font-bold flex gap-2 items-center text-sm sticky top-0 z-[500] bg-gray-100"
                      >
                        ${this.keyIcon(column_name)}
                        <div class="flex flex-col gap-1">
                          <div>
                            <div class="text-opacity-60 text-black inline-block py-0.5 text-xs font-normal rounded">${
                              column_data.meta.Type
                            }</div>
                          </div>
                          ${column_name}
                        </div>
                      </table-heading>
                    `;
                  })
                  .join("")}
              </table-headings>
              <table-cells class="contents">
                <table-row-ghost hidden>
                  <template data-first>
                    <table-row class="contents row-new">
                      <row-select></row-select>
                      ${this.templateTableCells()}
                    </table-row>
                  </template>
                </table-row-ghost>
                ${this.data.rows
                  .map((row, index) => {
                    return `
                    <table-row class="contents">
                      <row-select class="flex sticky z-50 left-0 heading-bkg">
                        <label class="tp relative">
                          <input type="checkbox" class="checkstyle form-checkbox" name="test" />
                          <div class="absolute block inset-0 shadow-y"></div>
                        </label>
                      </row-select>
                      ${this.data.cols_order
                        .map((col) => {
                          return `
                            <table-cell
                              class="relative"
                              col="${col}"
                              row="${row[this.data.meta.id]}"
                              index="${index}"
                            ></table-cell>
                          `;
                        })
                        .join("")}
                    </table-row>`;
                  })
                  .join("")}
              </table-cells>
            </div>
          </div>
        </div>
      </div>
      <pagination-x></pagination-x>
    `;

    this.setFirstCellActive();

    this.onChangeCheckAll();
    this.onChangeCheckOne();
  }

  keyIcon(col) {
    if (!col.config || !col.config.id) return "";
    return `<img-svg src="remixicon/key-2-line.svg" classes="w-5 h-5"></img-svg>`;
  }

  // EVENTS

  onChangeCheckAll() {
    $("table-heading-check input", this).on("change", (e) => {
      const checked = e.currentTarget.checked;

      $$("row-select input", this).forEach(() => {
        this.checkToggleAll(checked);
      });
    });
  }

  onChangeCheckOne() {
    $$("row-select input", this).forEach((el) => {
      el.on("change", (e) => {
        const el = e.currentTarget;
        const checked = el.checked;

        el.closest("table-row").classList.toggle("row-selected", checked);
      });
    });
  }

  // ACTIONS

  setFirstCellActive() {
    $("cell-ring", this).setAttribute("state", "active");
  }

  checkToggleAll(checked) {
    $$("table-row", this).forEach((el) => {
      el.classList.toggle("row-selected", checked);
    });

    $$("row-select input", this).forEach((el) => {
      el.checked = checked;
    });
  }

  addRow() {
    const db_name = `${this.db} ${this.tb}`;
    const row = $("[data-first]", this).innerHTML;
    const current_row = $('cell-ring[state="active"]', this).closest(
      "table-row"
    );

    $('cell-ring[state="active"]', this)
      .closest("table-row")
      .insertAdjacentHTML("afterend", row);

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    current_row.nextElementSibling.dataset.index = timestamp;

    temp["insert"][db_name].data[timestamp] = temp["insert"][db_name].defaults;
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

  gridCols() {
    const this_data = get.tb.items(this.db, this.tb);

    let sum = 0;
    let widths = [];

    this_data.cols_order.forEach((item) => {
      let width = null;
      const item_obj = this_data.cols[item];

      if (item_obj.config && item_obj.config.hasOwnProperty("width")) {
        width = item_obj.config.width;
      } else {
        width = 300;
      }

      widths.push(width);

      sum += width;

      console.log(width);
      //console.log(item);
      //console.log(this_data.cols[item].config);
    });

    return {
      sum: sum,
      widths: widths,
    };
  }

  templateTableCells() {
    let html = "";

    temp["insert"][this.tb] = {
      defaults: {},
      data: [],
    };

    this.data.cols_order.forEach((column) => {
      const nullable = this.isNullable(column);
      const value = this.parseDefault(column);

      if (this.data.meta.id !== column) {
        temp["insert"][this.tb]["defaults"][column] =
          nullable == "true" ? "" : value;
      }

      html += `
        <table-cell class="relative" col="${column}">
          <cell-ring></cell-ring>
          <cell-edit></cell-edit>
          <cell-preview>
            <preview-null class="text-opacity-50 text-gray-800 italic">NULL</preview-null>
            <preview-value>${row[column]}</preview-value>
          </cell-preview>
        </table-cell>
      `;
    });

    return html;
  }

  parseDefault(column) {
    let value = this.data.cols[column].meta.Default;

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

  isNullable(column) {
    return this.data.cols[column].meta.Null == "YES" ? "true" : "false";
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
    this.removeAttribute("hidden");
  }

  thisDeactivate() {
    this.setAttribute("hidden", "");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("pane-main", PaneMain);
