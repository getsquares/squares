class RowActions extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.setAttribute("hidden", "");
    this.innerHTML = `
      <delete-x class="btn btn-delete">
        <img-svg src="remixicon/delete-bin-line.svg" classes="w-5 h-5"></img-svg>
        Delete</delete-x>
      <delete-x class="btn btn-clone">
        <img-svg src="remixicon/file-copy-2-line.svg" classes="w-5 h-5"></img-svg>
        Clone</delete-x>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
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
    this.removeAttribute("hidden");
  }

  deactivate() {
    this.setAttribute("hidden", "");
  }
}
customElements.define("row-actions", RowActions);
