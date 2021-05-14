class CellPreview extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active", "is_null", "nullable"];
  }

  connectedCallback() {
    this.innerHTML = `
      <preview-null class="text-opacity-50 text-gray-800 italic" hidden>NULL</preview-null>
      <preview-value></preview-value>
    `;

    this.toggleActive();
    this.toggleNull();
  }

  set nullable(value) {
    this.nullableValue = value;
  }
  get nullable() {
    return this.nullableValue;
  }

  set active(value) {
    this.activeValue = value;
  }
  get active() {
    return this.activeValue;
  }

  set is_null(value) {
    this.nullValue = value;
  }
  get is_null() {
    return this.nullValue;
  }

  toggleNull() {
    if (!this.nullable) return;
    if (!$("preview-null", this)) return;

    if (this.is_null) {
      this.showNull();
    } else {
      this.showValue();
    }
  }

  toggleActive() {
    if (this.active) {
      this.thisActivate();
    } else {
      this.thisDeactivate();
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (attr) {
        case "active":
          this.active = newValue == "true" ? true : false;
          this.toggleActive();
          break;
        case "is_null":
          this.is_null = newValue == "true" ? true : false;
          this.toggleNull();
          break;
        case "nullable":
          this.nullable = newValue == "true" ? true : false;
          break;
      }
    }
  }

  showNull() {
    $("preview-null", this).removeAttribute("hidden");
    $("preview-value", this).setAttribute("hidden", "");
  }

  showValue() {
    $("preview-null", this).setAttribute("hidden", "");
    $("preview-value", this).removeAttribute("hidden");
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
