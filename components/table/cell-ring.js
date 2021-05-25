class CellRing extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["state"];
  }

  connectedCallback() {
    //this.onDblClick();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "state") return;
    if (oldValue !== newValue) {
      if (newValue != "default") {
        this.xEdges();
      }
    }
  }

  // Handlers
}

//customElements.define("cell-ring", CellRing);
