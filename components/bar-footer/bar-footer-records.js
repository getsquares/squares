class BarFooterRecords extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    this.classList.add("flex", "items-center", "gap-4");
    const value = this.getAttribute("value");

    this.innerHTML = `
      <div class="py-1.5 px-2 select-none flex gap-2 items-center hover:bg-gray-200 rounded"
      >
        <img-svg src="assets/icons/remixicon/layout-row-line.svg"></img-svg>
        <div data-local-records>${value}</div>
      </div>
    `;
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "offset") {
        database.innerHTML = newValue;
      } else if (attr == "table" && table) {
        table.innerHTML = newValue;
      }
    }
  }*/
}

customElements.define("bar-footer-records", BarFooterRecords);
