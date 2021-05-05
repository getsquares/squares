class RecordsX extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["limit", "rows", "total"];
  }

  connectedCallback() {
    this.classList.add("text-13", "items-center", "flex");
    this.update();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.update();
    }
  }

  update() {
    const offset = this.getAttribute("offset");
    const rows = this.getAttribute("rows");
    const total = this.getAttribute("total");

    this.innerHTML = this.template(offset, rows, total);
  }

  template(offset, rows, total) {
    const from = offset;
    const to = parseInt(offset) + parseInt(rows);
    const all = parseInt(total).toLocaleString("en-US");

    return `${from}-${to} of ${all}`;
  }
}
customElements.define("records-x", RecordsX);
