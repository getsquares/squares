class FieldText extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    //const value = cell.getTempValue(this);
    const value = "omomo";
    this.innerHTML = `
      <input value="${value}" type="text" class="form-input focus:outline-none focus:ring-yellow-500 focus:ring-offset-1 border-2 focus:ring-2 focus:border-gray-300 border-gray-300">
    `;

    this.onKeyup();
    this.onEnter();
    this.onEscape();

    updatePreview($("input", this).value, this);

    $("input", this).select();
  }

  // On key up
  onKeyup() {
    $("input", this).addEventListener("keyup", (e) => {
      const value = e.currentTarget.value;
      cell.setTempValue(value, this);
      updatePreview(value, this);

      console.log(temp);
    });
  }

  onEnter() {
    $("input", this).addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      leaveEdit(e);
    });
  }

  onEscape() {
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const el_cell_ring = $('cell-ring[state="edit"]');
      if (!el_cell_ring) return;

      e.preventDefault();
      fieldClose();
    });
  }

  // Enter

  attributeChangedCallback(attr, oldValue, newValue) {
    /*if (attr != "active") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }*/
  }
}

customElements.define("field-text", FieldText);
