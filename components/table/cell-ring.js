class CellRing extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["state"];
  }

  connectedCallback() {
    this.classList.add("absolute", "block", "inset-0", "z-10");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "state") return;
    if (oldValue !== newValue) {
      this.classList.remove(
        "ring-1",
        "ring-2",
        "ring-gray-500",
        "ring-blue-500",
        "ring-orange-500",
        "z-10",
        "z-30",
        "shadow-y",
        "ml-2px"
      );
      const prev_el = this.closest("table-cell").previousElementSibling;
      const next_el = this.closest("table-cell").nextElementSibling;

      switch (newValue) {
        case "default":
          this.classList.add("shadow-y");
          this.classList.add("z-10");
          break;
        case "active":
          this.classList.add("ring-2", "ring-gray-500", "z-30");
          break;
        case "changed":
          this.classList.add("ring-2", "ring-orange-500", "z-30");
          break;
        case "edit":
          this.classList.add("ring-2", "ring-blue-500", "z-30");
          break;
      }

      if (newValue != "default") {
        if (prev_el.tagName == "ROW-SELECT") this.classList.add("ml-2px");
        if (!next_el) this.classList.add("mr-2px");
      }
    }
  }
}

customElements.define("cell-ring", CellRing);
