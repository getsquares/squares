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
      "tp",
      "heading-bkg",
      "font-bold",
      "flex",
      "gap-2",
      "items-center",
      "text-sm",
      "sticky",
      "top-0",
      "z-50"
    );
    this.innerHTML = `
      ${key_html}
      ${title}
    `;
  }

  keyHtml() {
    return `<img-svg src="remixicon/key-2-line.svg" classes="w-5 h-5"></img-svg>`;
  }

  /*attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "title") return;
    if (oldValue !== newValue) {
      this.title = newValue;
    }
  }*/
}

customElements.define("table-heading", TableHeading);
