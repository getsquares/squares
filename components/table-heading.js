class TableHeading extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    this.classList.add(
      "p-2",
      "ring-1",
      "ring-gray-300",
      "bg-gray-100",
      "font-bold",
      "sticky",
      "top-0",
      "z-50"
    );
    this.innerHTML = `
        ${this.title}
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "title") return;
    if (oldValue !== newValue) {
      this.title = newValue;
    }
  }
}

customElements.define("table-heading", TableHeading);
