class NavDbGroups extends HTMLElement {
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
      <nav-db-group>
        <nav-db db="${name}" class="nav-row">
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
            classes="w-4 h-4 text-gray-800">
          </img-svg>
        </nav-db>
        <nav-tb-section hidden>
          <nav-refresh class="nav-row">
            <img-svg
              src="material-icons/refresh.svg"
              classes="w-4 h-4 text-gray-400">
            </img-svg>
            <div class="flex-1 truncate text-13">Refresh</div>
          </nav-refresh>
          <nav-loading class="nav-row">
            <img-svg
              src="material-icons/refresh.svg"
              classes="w-4 h-4 text-gray-400 animate-spin">
            </img-svg>
            <div class="flex-1 truncate text-13">Loading...</div>
          </nav-loading>
          <nav-tb-group></nav-tb-group>
        </nav-tb-section>
      </nav-db-group>`;
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
        <nav-tb tb="${tb}" title="${tb}" class="nav-row">
          <img-svg src="boxicons/bx-table.svg" classes="w-4 h-4 text-navy-400"></img-svg>
          <div class="flex-1 truncate text-13">${tb}</div>
        </nav-tb>
      `;
    });

    nav.tb.group(db).innerHTML = html;
    this.onClickTable(db);
  }

  // On click refresh
  onClickRefresh() {
    $$("nav-refresh").forEach((el) => {
      el.on("click", (e) => {
        const db_group = e.currentTarget.closest("nav-db-group");
        const db = $("nav-db", db_group).getAttribute("db");
        actions.tables.load(db);
      });
    });
  }

  // On click database
  onClickDatabase() {
    $$("nav-db").forEach((el) => {
      el.on("click", (e) => {
        actions.database.toggle(e.currentTarget.getAttribute("db"));
      });
    });
  }

  // On click table
  onClickTable(db) {
    $("nav-tb", nav.tb.group(db)).forEach((el) => {
      el.on("click", (e) => {
        const tb = e.currentTarget.getAttribute("tb");
        const db = $("nav-db", this.closest("nav-db-group")).getAttribute("db");
        actions.table.load(db, tb);
      });
    });
  }
}

customElements.define("nav-db-groups", NavDbGroups);

/*
FIXME: Inaktivera alla panemain 
FIXME: Lägg till pane-main
FIXME: Uppdatera rows offset och total

const html = `
  <pane-main database="${current.database}" table="${current.table}" active="true"></pane-main>
`;

$$("pane-main").forEach((item) => {
  item.deactivate();
});

$("main-x").insertAdjacentHTML("beforeend", html);

const current_el = $(
  `pane-main[database="${current.database}"][table="${current.table}"]`
);

$("select-table").setAttribute("hidden", "");

$("records-x", current_el).setAttribute("rows", test.meta.limit);
$("records-x", current_el).setAttribute("offset", test.meta.offset);
$("records-x", current_el).setAttribute("total", test.meta.total);
*/
