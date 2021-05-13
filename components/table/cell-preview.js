class CellPreview extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active", "null"];
  }

  connectedCallback() {
    const has_null =
      this.closest("table-cell").getAttribute("nullable") == "YES"
        ? true
        : false;
    let html_null = "";

    if (has_null) {
      html_null = `<preview-null class="text-opacity-50 text-gray-800 italic">NULL</preview-null>`;
    }
    this.innerHTML = `
      ${html_null}
      <preview-value></preview-value>
    `;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      console.log("differ");
      if (attr == "active") {
        if (newValue == "true") {
          this.thisActivate();
        } else {
          this.thisDeactivate();
        }
      } else if (attr == "null") {
        if (newValue == "true") {
          this.showNull();
          this.hideValue();
        } else {
          this.hideNull();
          this.showValue();
        }
      }
    }
  }

  showNull() {
    $("preview-null", this).removeAttribute("hidden");
  }

  hideNull() {
    $("preview-null", this).setAttribute("hidden", "");
  }

  showValue() {
    $("preview-value", this).removeAttribute("hidden");
  }

  hideValue() {
    $("preview-value", this).setAttribute("hidden", "");
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

customElements.define("cell-preview", CellPreview);
