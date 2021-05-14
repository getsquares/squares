class CellEdit extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active", "is_null", "nullable"];
  }

  connectedCallback() {
    this.toggleActive();
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

  toggleActive() {
    if (this.active) {
      this.thisActivate();
    } else {
      this.thisDeactivate();
    }
  }

  toggleNull() {
    if (!this.nullable) return;
    if (this.is_null) {
      this.setChecked(true);
    } else {
      this.setChecked(false);
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

  setChecked(value) {
    const checkbox = $('input[type="checkbox"][name="null"]');
    if (!checkbox) return;

    $('input[type="checkbox"][name="null"]').checked = value;
  }

  populate() {
    const has_null =
      this.closest("table-cell").getAttribute("nullable") == "true"
        ? true
        : false;
    let html_null = "";
    if (has_null) {
      html_null = `
        <label class="flex gap-2 items-center">
          <input type="checkbox" class="checkstyle-white form-checkbox" name="null">
          <div class="italic">NULL</div>
        </label>
      `;
    }
    let html = `
      ${html_null}
      <field-text></field-text>
    `;

    this.innerHTML = html;

    if (!has_null) return;

    this.onClickNull();
  }

  onClickNull() {
    $('input[type="checkbox"][name="null"]', this).addEventListener(
      "click",
      (e) => {
        const checked = e.currentTarget.checked ? true : false;
        $("cell-preview", this.closest("table-cell")).setAttribute(
          "is_null",
          checked
        );
        this.setAttribute("is_null", checked);
      }
    );
  }

  thisActivate() {
    this.removeAttribute("hidden");
    this.populate();
    this.toggleNull();
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
