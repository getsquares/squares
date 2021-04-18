class TableHeadingCheck extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(
      "ring-1",
      "ring-gray-300",
      "sticky",
      "top-0",
      "z-40",
      "flex"
    );
    this.innerHTML = `
      <label class="py-2 px-4 relative bg-gray-100 flex items-center">
        <input type="checkbox" class="w-5 h-5 rounded-sm text-white" name="test" />
        <div class="absolute block inset-0 ring-1 ring-gray-300"></div>
      </label>
    `;
    this.onChange();
  }

  keyHtml() {
    return `<img-svg src="assets/icons/remixicon/key-2-line.svg"></img-svg>`;
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
