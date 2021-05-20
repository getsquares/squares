triggers.database = {};
triggers.db = {};

// Load
triggers.database.load = () => {
  $("nav-db-groups").databasesPopulate();
};

// Toggle
triggers.db.toggle = (db) => {
  triggers.db.open(db);
  triggers.db.close(db);
};

// Open
triggers.db.open = (db) => {
  if (!state.databases[db].open) return;

  nav.arrow(db).classList.add("rotate-180");
  nav.tb.section(db).removeAttribute("hidden");

  if (nav.tb.group(db).innerHTML == "") {
    actions.tables.load(db);
  }
};

// Close
triggers.db.close = (db) => {
  if (state.databases[db].open) return;

  nav.arrow(db).classList.remove("rotate-180");
  nav.tb.section(db).setAttribute("hidden", "");
};
