class BarFooterItems extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["database", "table"];
  }

  connectedCallback() {
    this.classList.add("flex", "items-center", "gap-4");
    this.setAttribute("hidden", "");

    this.innerHTML = `
      ${this.itemHtml(
        this.getAttribute("database"),
        "database",
        "assets/icons/remixicon/database-2.svg"
      )}

      ${this.itemHtml(
        this.getAttribute("table"),
        "table",
        "assets/icons/remixicon/table-line.svg"
      )}

      ${this.itemHtml(
        this.getAttribute("records"),
        "records",
        "assets/icons/remixicon/layout-row-line.svg"
      )}
    `;
  }

  itemHtml(value, type, src) {
    return `
      <div class="py-1.5 px-2 select-none flex gap-2 items-center hover:bg-gray-200 rounded"
      >
        <img-svg src="${src}"></img-svg>
        <div data-local-${type}>${value}</div>
      </div>
    `;
  }

  keyHtml() {
    return `<img-svg src="assets/icons/remixicon/key-2-line.svg"></img-svg>`;
  }

  setRecords(offset, rows, total) {
    this.querySelector(
      `[data-local-records]`
    ).innerHTML = `${offset}-${rows} of ${total}`;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const database = this.querySelector("[data-local-database]");
    const table = this.querySelector("[data-local-table]");

    if (oldValue !== newValue) {
      if (attr == "database" && database) {
        database.innerHTML = newValue;
        this.removeAttribute("hidden");
      } else if (attr == "table" && table) {
        table.innerHTML = newValue;
      }
    }
  }
}

customElements.define("bar-footer-items", BarFooterItems);
