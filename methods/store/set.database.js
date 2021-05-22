set.database = {};

// Order
set.database.order = (content) => {
  state.databases_order = content;
};

// Items
set.database.items = (content) => {
  state.databases = {};

  content.forEach((item) => {
    state.databases[item] = {
      open: false,
      table_order: [],
      table_items: {},
    };
  });

  triggers.db.load();
};

// Toggle state
set.database.toggleState = (db) => {
  state.databases[db].open = !state.databases[db].open;
  triggers.db.toggle(db);
};
