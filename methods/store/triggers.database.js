triggers.db = {};

// Load
triggers.db.load = () => {
  $("db-list").databasesPopulate();
};

// Toggle
triggers.db.toggle = (db) => {
  triggers.db.open(db);
  triggers.db.close(db);
};

// Open
triggers.db.open = (db) => {
  if (!state.databases[db].open) return;

  $("db-list").arrowUp(db);
  $("db-list").showElement("tb-section", db);

  if ($("db-list").groupEmpty(db)) {
    actions.tables.load(db);
  }
};

// Close
triggers.db.close = (db) => {
  if (state.databases[db].open) return;

  $("db-list").arrowDown(db);
  $("db-list").hideElement("tb-section", db);
};
