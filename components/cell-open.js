class CellOpen extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["open"];
  }

  connectedCallback() {
    this.setAttribute("open", "false");
    this.classList.add(
      "z-20",
      "hidden",
      "block",
      "absolute",
      "bg-gray-100",
      "shadow-md",
      "rounded-b",
      "top-full",
      "p-4",
      "left-0",
      "mt-0.5"
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "open") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }
  }
}

customElements.define("cell-open", CellOpen);
