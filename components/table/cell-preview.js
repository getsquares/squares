class CellPreview extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("block", "relative", "tp");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "active") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }
  }
}

customElements.define("cell-preview", CellPreview);
