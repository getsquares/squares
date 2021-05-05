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
    const type = this.getAttribute("fieldtype");
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
      "z-[500]",
      "bg-gray-100"
    );
    this.innerHTML = `
      ${key_html}
      <div class="flex flex-col gap-1">
        <div>
          <div class="text-opacity-60 text-black inline-block py-0.5 text-xs font-normal rounded">${type}</div>
        </div>
        ${title}
      </div>
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
