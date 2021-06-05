class FieldText extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    const { db, tb, col, row, index } = get.dom.cell.data(this);
    const value = get.tb.updated(db, tb, row, col, index);

    this.innerHTML = `
      <input value="${value}" type="text" class="form-input leading-normal focus:outline-none focus:ring-0 focus:ring-offset-0 border-2 focus:border-gray-300 border-gray-300 text-13 tp">
    `;

    this.onKeyup();
    this.onEnter();
    this.onEscape();

    set.new.buffer(value, this);
    updatePreview(value, this);

    $("input", this).focus();
    $("input", this).select();
  }

  // On key up
  onKeyup() {
    $("input", this).addEventListener("keyup", (e) => {
      const value = e.currentTarget.value;
      set.new.buffer(value, this);
      updatePreview(value, this);

      console.log(state);
    });
  }

  onEnter() {
    $("input", this).addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      leaveEdit(e.currentTarget);
    });
  }

  onEscape() {
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const root = $(`pane-main[db=${state.database}][tb=${state.table}]`);
      const el = $(`cell-ring[state="edit"]`, root);

      if (!el) return;

      e.preventDefault();
      fieldClose(el);
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
