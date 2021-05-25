class ActionsAdd extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.classList.add("btn", "btn-default");

    this.innerHTML = `
      <img-svg src="remixicon/add-circle-line.svg" classes="w-5 h-5"></img-svg>
      <div>Add</div>
    `;

    this.onClick();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (attr == "active") {
      }
    }
  }

  onClick() {
    this.addEventListener("click", () => {
      const el_cell_active = $(
        `cell-ring[state="active"]`,
        this.closest("pane-main")
      );

      if (!el_cell_active) return;

      el_cell_active.closest("pane-main").addRow();
    });
  }
}

customElements.define("actions-add", ActionsAdd);
