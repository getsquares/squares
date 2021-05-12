class CellEdit extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.setAttribute("hidden", "");
    this.classList.add(
      "z-20",
      "block",
      "absolute",
      "bg-gray-100",
      "shadow-md",
      "top-full",
      "p-4",
      "left-0",
      "mt-0.5"
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "active") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.thisActivate();
      } else {
        this.thisDeactivate();
      }
    }
  }

  thisActivate() {
    this.removeAttribute("hidden");
  }

  thisDeactivate() {
    this.setAttribute("hidden", "");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  deactivate() {
    this.removeAttribute("active");
  }
}

customElements.define("cell-edit", CellEdit);
