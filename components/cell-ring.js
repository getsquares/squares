class CellRing extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["state"];
  }

  connectedCallback() {
    this.classList.add(
      "absolute",
      "block",
      "inset-0",
      "ring-1",
      "z-10",
      "ring-gray-200"
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "state") return;
    if (oldValue !== newValue) {
      this.classList.remove(
        "ring-1",
        "ring-2",
        "ring-gray-200",
        "ring-gray-600",
        "ring-blue-500",
        "z-10",
        "z-20"
      );
      switch (newValue) {
        case "default":
          this.classList.add("ring-1", "ring-gray-200", "z-10");
          break;
        case "active":
          this.classList.add("ring-2", "ring-gray-600", "z-20");
          break;
        case "changed":
          this.classList.add("ring-2", "ring-orange-500", "z-20");
          break;
        case "edit":
          this.classList.add("ring-2", "ring-blue-500", "z-20");
          break;
      }
    }
  }
}

customElements.define("cell-ring", CellRing);
