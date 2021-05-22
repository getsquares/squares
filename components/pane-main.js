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
                  .map((item) => {
                    const col = this.data.cols[item];
                    const key = col.config && col.config.id ? true : false;
                    return `
                      <table-heading
                        class="tp heading-bkg font-bold flex gap-2 items-center text-sm sticky top-0 z-[500] bg-gray-100"
                      >
                        ${
                          key
                            ? `<img-svg src="remixicon/key-2-line.svg" classes="w-5 h-5"></img-svg>`
                            : ""
                        }
                        <div class="flex flex-col gap-1">
                          <div>
                            <div class="text-opacity-60 text-black inline-block py-0.5 text-xs font-normal rounded">${
                              col.meta.Type
                            }</div>
                          </div>
                          ${item}
                        </div>
                      </table-heading>
                    `;
                  })
                  .join("")}
              </table-headings>
              <table-cells></table-cells>
            </div>
          </div>
        </div>
      </div>
      <pagination-x></pagination-x>
    `;

    this.onChangeCheckAll();
  }

  // EVENTS

  onChangeCheckAll() {
    $("table-heading-check input", this).on("change", (e) => {
      const checked = e.currentTarget.checked;

      $$("row-select input", this).forEach(() => {
        this.checkToggle(checked);
      });
    });
  }

  checkToggle(checked) {
    $$("table-row", this).forEach((el) => {
      el.classList.toggle("row-selected", checked);
    });

    $$("row-select input", this).forEach((el) => {
      el.checked = checked;
    });
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

  part() {
    return `
      <div class="contents">
        <row-select></row-select>
        <table-cell></table-cell>
        <table-cell></table-cell>
        <table-cell></table-cell>
      </div>`;
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
