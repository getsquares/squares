class TableHeading extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["title"];
  }

  connectedCallback() {
    const id = this.getAttribute("key");
    const title = this.getAttribute("title");
    const key_html = id ? this.keyHtml() : "";

    this.classList.add(
      "px-2",
      "py-3",
      "ring-1",
      "ring-gray-300",
      "bg-gray-100",
      "font-bold",
      "sticky",
      "top-0",
      "z-40",
      "flex",
      "gap-2",
      "items-center",
      "text-base"
    );
    this.innerHTML = `
      ${key_html}
      ${title}
    `;
  }

  keyHtml() {
    return `<img-svg src="assets/icons/remixicon/key-2-line.svg"></img-svg>`;
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "title") return;
    if (oldValue !== newValue) {
      this.title = newValue;
    }
  }*/
}

customElements.define("table-heading", TableHeading);
