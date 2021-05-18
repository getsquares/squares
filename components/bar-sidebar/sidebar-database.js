class SidebarDatabase extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["open"];
  }

  set database(value) {
    this.databaseValue = value;
  }

  get database() {
    return this.databaseValue;
  }

  connectedCallback() {
    this.database = this.getAttribute("database");

    this.innerHTML = `
      <sidebar-database-item database="${this.database}"></sidebar-database-item>
      <sidebar-tables></sidebar-tables>
      `;

    this.onClickDatabase();
  }

  onClickDatabase() {
    $("sidebar-database-item", this).on("click", () => {
      actions.databaseToggle(!this.isOpen(), this.database);
    });
  }

  open() {
    this.setAttribute("open", "true");
  }

  close() {
    this.removeAttribute("open");
  }

  setOpen() {
    $("sidebar-database-item", this).open();
  }

  setClose() {
    $("sidebar-database-item", this).close();
  }

  isOpen() {
    return this.getAttribute("open") == "true" ? true : false;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (attr) {
        case "open":
          if (newValue == "true") {
            this.setOpen();
          } else {
            this.setClose();
          }
          break;
      }
    }
  }

  /*onClickTable(el) {
    el.addEventListener("click", () => {
      if (el.isActive()) {
        el.deactivate();
      } else {
        el.activate();
      }
    });
  }

  deactivateAllTables() {
    $$("sidebar-table").forEach((item) => {
      item.deactivate();
    });
  }

  populateEvents(tables) {
    tables.querySelectorAll("sidebar-table").forEach((item) => {
      item.addEventListener("click", (e) => {
        const el = e.currentTarget;
        this.deactivateAllTables();
        el.activate();

        const offset = 1;
        const rows = 300;
        const total = 1235;

        //$("bar-footer-items").setAttribute("database", this.getValue());
        //$("bar-footer-items").setAttribute("table", el.getValue());
        //$("bar-footer-items").setRecords(offset, rows, total);
      });
    });
  }

  deactivate() {
    this.removeAttribute("active");
    this.querySelector("sidebar-tables").setAttribute("hidden", "");
  }*/
}

customElements.define("sidebar-database", SidebarDatabase);
