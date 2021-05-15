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
      //data[`${main.getAttribute("database")} ${main.getAttribute("table")}`];
      console.log(current.database);
      const el_cell_active = $(
        `cell-ring[state="active"]`,
        this.closest("pane-main")
      );

      console.log("dooo2");
      if (!el_cell_active) return;

      console.log("dooo");

      el_cell_active.closest("table-row").addRow();
    });
  }
}

customElements.define("actions-add", ActionsAdd);
