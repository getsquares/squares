class FieldText extends HTMLElement {
  constructor() {
    super();
  }

  config() {
    return {
      mode: "dropdown",
    };
  }

  connectedCallback() {
    const { db, tb, col, row, index } = get.dom.cell.data(this);
    const value = get.tb.updated(db, tb, row, col, index);

    this.innerHTML = `
      <input value="${value}" type="text" class="form-input leading-normal focus:outline-none focus:ring-0 focus:ring-offset-0 border focus:border-gray-300 border-gray-300 text-13 tp">
    `;

    this.onKeyup();
    this.onEnter();

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
    });
  }

  onEnter() {
    $("input", this).addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      leaveEdit(e.currentTarget);
    });
  }
}

customElements.define("field-text", FieldText);
