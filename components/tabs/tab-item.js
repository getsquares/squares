class TabItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  set database(value) {
    this.databaseValue = value;
  }

  get database() {
    return this.databaseValue;
  }

  set table(value) {
    this.tableValue = value;
  }

  get table() {
    return this.tableValue;
  }

  connectedCallback() {
    this.database = this.getAttribute("database");
    this.table = this.getAttribute("table");

    this.setAttribute("title", this.database + "/" + this.table);

    this.innerHTML = `
      ${this.table}
      <img-svg src="remixicon/close.svg" classes="rounded w-5 h-5">
    `;

    this.onClick();
    this.onCloseClick();
    this.onMiddleClick();
  }

  deactivate() {
    this.removeAttribute("active");
  }

  activate() {
    this.setAttribute("active", "true");
  }

  /*isActive() {
    return this.getAttribute("active") == "true";
  }*/

  onClick() {
    this.on("mousedown", (e) => {
      if (e.currentTarget !== e.target || e.button === 1) return;

      actions.table.activate(this.database, this.table);
    });
  }

  onCloseClick() {
    $("img-svg", this).on("click", () => {
      this.handleClose();
    });
  }

  onMiddleClick() {
    this.on("mouseup", (e) => {
      if (e.button !== 1) return;

      this.handleClose();
    });
  }

  handleClose() {
    if (this.getAttribute("active") == "true") {
      actions.table.close(this.database, this.table);
    } else {
      this.remove();
    }
  }
}

customElements.define("tab-item", TabItem);
