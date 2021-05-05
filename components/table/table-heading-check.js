class TableHeadingCheck extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "sticky",
      "top-0",
      "z-[600]",
      "flex",
      "sticky",
      "bg-gray-100",
      "heading-bkg",
      "left-0"
    );

    this.innerHTML = `
      <label class="tp relative heading-bkg flex items-center bg-gray-100">
        <input type="checkbox" class="form-checkbox checkstyle-white" name="test" />
      </label>
    `;
    this.onChange();
  }

  keyHtml() {
    return `<img-svg src="remixicon/key-2-line.svg"></img-svg>`;
  }

  onChange() {
    this.querySelector("input").addEventListener("change", (e) => {
      const checked = e.currentTarget.checked;

      $$("row-select").forEach((item) => {
        item.querySelector("input").checked = checked;

        if (checked) {
          this.selectAll();
        } else {
          this.deselectAll();
        }
      });
    });
  }

  selectAll() {
    $$("[data-cells] row-select").forEach((item) => {
      const el_cells = item
        .closest(".contents")
        .querySelectorAll("row-select, table-cell");

      el_cells.forEach((el) => {
        item.selectOne(el);
      });
    });
  }

  deselectAll() {
    $$("[data-cells] row-select").forEach((item) => {
      const el_cells = item
        .closest(".contents")
        .querySelectorAll("row-select, table-cell");

      el_cells.forEach((el) => {
        item.deselectOne(el);
      });
    });
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "title") return;
    if (oldValue !== newValue) {
      this.title = newValue;
    }
  }*/
}

customElements.define("table-heading-check", TableHeadingCheck);
