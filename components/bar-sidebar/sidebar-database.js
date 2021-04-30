class SidebarDatabase extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    this.removeAttribute("title");

    this.innerHTML = `
      <div data-database class="${hollowClassInactive().join(
        " "
      )} flex gap-2 px-4 py-1 cursor-default select-none fill-current items-center">
        <img-svg src="remixicon/database-2-fill.svg" classes="w-4 h-4 text-yellow-500"></img-svg>
        <div data-local-database class="flex-1 truncate font-bold text-sm">${title}</div>
        <img-svg data-arrow src="remixicon/arrow-down-s.svg" classes="transform rotate-180 w-4 h-4"></img-svg>
      </div>

      <div data-tables hidden></div>
      `;
    this.onClickDatabase();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      const arrow = this.querySelector("[data-arrow] svg");

      if (arrow) {
        if (attr == "active" && newValue == "true") {
          arrow.classList.remove("rotate-180");
        } else {
          arrow.classList.add("rotate-180");
        }
      }
    }
  }

  onClickDatabase() {
    this.querySelector("[data-database]").addEventListener("click", (e) => {
      if (this.isActive()) {
        this.deactivate();
      } else {
        this.activate();
      }
    });
  }

  onClickTable(el) {
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

  activate() {
    const tables = this.querySelector("[data-tables]");
    this.setAttribute("active", "true");
    this.querySelector("[data-tables]").removeAttribute("hidden");

    if (tables.innerHTML == "") {
      this.populate();
      /*

      tables.querySelectorAll("sidebar-table").forEach((item) => {
        item.addEventListener("click", (e) => {
          const el = e.currentTarget;
          this.deactivateAllTables();
          el.activate();

          const offset = 1;
          const rows = 300;
          const total = 1235;

          $("bar-footer-items").setAttribute("database", this.getValue());
          $("bar-footer-items").setAttribute("table", el.getValue());
          $("bar-footer-items").setRecords(offset, rows, total);
        });
      });*/
    }
  }

  populate() {
    const tables = this.querySelector("[data-tables]");
    tables.innerHTML = `<sidebar-database-loading></sidebar-database-loading>`;

    axios
      .get(
        "http://localhost/tools/squares/server/php/queries/tables.php?database=" +
          this.getValue()
      )
      .then((response) => {
        if (response.status !== 200) return;

        let html = `
        <sidebar-database-refresh></sidebar-database-refresh>
        `;

        response.data.forEach((title) => {
          html += this.template(title);
        });

        tables.innerHTML = html;
        $("sidebar-filter").filter(tables);
        this.populateEvents(tables);
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

        $("bar-footer-items").setAttribute("database", this.getValue());
        $("bar-footer-items").setAttribute("table", el.getValue());
        $("bar-footer-items").setRecords(offset, rows, total);
      });
    });
  }

  template(title) {
    return `<sidebar-table title="${title}"></sidebar-table>`;
  }

  deactivate() {
    this.removeAttribute("active");
    this.querySelector("[data-tables]").setAttribute("hidden", "");
  }

  isActive() {
    return this.getAttribute("active") == "true";
  }

  getValue() {
    return this.querySelector("[data-local-database]").innerHTML;
  }
}

customElements.define("sidebar-database", SidebarDatabase);
