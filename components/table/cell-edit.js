class CellEdit extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active", "null"];
  }

  connectedCallback() {
    this.setAttribute("hidden", "");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr != "active") return;
    if (oldValue !== newValue) {
      switch (attr) {
        case "active":
          if (newValue == "true") {
            this.thisActivate();
          } else {
            this.thisDeactivate();
          }
          break;
        case "null":
          if (newValue == "true") {
            this.setChecked(true);
          } else {
            this.setChecked(false);
          }
          break;
      }
    }
  }

  setChecked(value) {
    $('input[type="checkbox"][name="null"]').checked = value;
  }

  populate() {
    const has_null =
      this.closest("table-cell").getAttribute("nullable") == "YES"
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
        if (e.currentTarget.checked) {
          console.log("checked");
          console.log($("cell-preview", this.closest("table-cell")));
          $("cell-preview", this.closest("table-cell")).setAttribute(
            "null",
            "true"
          );
        } else {
          $("cell-preview", this.closest("table-cell")).setAttribute(
            "null",
            "false"
          );
        }
      }
    );
  }

  thisActivate() {
    this.removeAttribute("hidden");
    this.populate();
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
