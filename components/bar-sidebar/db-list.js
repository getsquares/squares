class DbList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add(...["flex", "flex-col"]);
    actions.databases.load();
  }

  // Databases populate
  databasesPopulate() {
    let html = "";

    state.databases_order.forEach((name) => {
      html += `
      <db-group db="${name}">
        <db-item class="nav-row">
          <img-svg
            src="remixicon/database-2-fill.svg"
            classes="w-4 h-4 text-yellow-500">
          </img-svg>
          <div class="flex-1 truncate font-bold text-sm">
            ${name}
          </div>
          <img-svg
            arrow
            src="remixicon/arrow-down-s.svg"
            class="transform"
            classes="w-4 h-4 text-gray-800">
          </img-svg>
        </db-item>
        <tb-section hidden>
          <tb-refresh class="nav-row">
            <img-svg
              src="material-icons/refresh.svg"
              classes="w-4 h-4 text-gray-400">
            </img-svg>
            <div class="flex-1 truncate text-13">Refresh</div>
          </tb-refresh>
          <tb-loading class="nav-row">
            <img-svg
              src="material-icons/refresh.svg"
              classes="w-4 h-4 text-gray-400 animate-spin">
            </img-svg>
            <div class="flex-1 truncate text-13">Loading...</div>
          </tb-loading>
          <tb-group></tb-group>
        </tb-section>
      </db-group>`;
    });

    this.innerHTML += html;
    this.onClickRefresh();
    this.onClickDatabase();
  }

  // Tables populate
  tablesPopulate(db) {
    let html = "";

    state.databases[db].table_order.forEach((tb) => {
      html += `
        <tb-item tb="${tb}" title="${tb}" class="nav-row">
          <img-svg src="boxicons/bx-table.svg" classes="w-4 h-4 text-navy-400"></img-svg>
          <div class="flex-1 truncate text-13">${tb}</div>
        </tb-item>
      `;
    });

    this.dom("tb-group", db).innerHTML = html;
    this.onClickTable(db);
  }

  // EVENTS

  // On click refresh
  onClickRefresh() {
    $$("tb-refresh").forEach((el) => {
      el.on("click", (e) => {
        const db = e.currentTarget.closest("db-group").getAttribute("db");

        actions.tables.load(db);
      });
    });
  }

  // On click database
  onClickDatabase() {
    $$("db-item").forEach((el) => {
      el.on("click", (e) => {
        const db = e.currentTarget.closest("db-group").getAttribute("db");

        actions.database.toggle(db);
      });
    });
  }

  // On click table
  onClickTable(db) {
    $$("tb-item", this.dom("tb-group", db)).forEach((el) => {
      el.on("click", (e) => {
        const current = e.currentTarget;
        const tb = current.getAttribute("tb");
        const db = current.closest("db-group").getAttribute("db");

        actions.table.load(db, tb);
      });
    });
  }

  // HELPERS

  // Arrow up
  arrowUp(db) {
    this.dom("[arrow]", db).classList.add("rotate-180");
  }

  // Arrow down
  arrowDown(db) {
    this.dom("[arrow]", db).classList.remove("rotate-180");
  }

  // Show element
  showElement(selector, db) {
    this.dom(selector, db).hidden = false;
  }

  // Hide element
  hideElement(selector, db) {
    this.dom(selector, db).hidden = true;
  }

  groupEmpty(db) {
    return this.dom("tb-group", db).innerHTML == "";
  }

  activateTb() {
    this.tbItem().setAttribute("active", "true");
  }

  deactivateTb() {
    $$(`tb-item`).forEach((el) => {
      el.removeAttribute("active");
    });
  }

  // DOM HELPERS

  // Dom
  dom = (selector, db) => {
    return $(selector, this.dbGroup(db));
  };

  // DB Group
  dbGroup = (db) => {
    return $(`db-group[db="${db}"]`);
  };

  // Current tb item
  tbItem = () => {
    return $(`tb-item[tb="${state.table}"]`, this.dbGroup(state.database));
  };
}

customElements.define("db-list", DbList);

/*
FIXME: Inaktivera alla panemain 
FIXME: Lägg till pane-main
FIXME: Uppdatera rows offset och total



const current_el = $(
  `pane-main[database="${current.database}"][table="${current.table}"]`
);

$("select-table").setAttribute("hidden", "");

$("records-x", current_el).setAttribute("rows", test.meta.limit);
$("records-x", current_el).setAttribute("offset", test.meta.offset);
$("records-x", current_el).setAttribute("total", test.meta.total);
*/
