set.table = {};

// Order
set.table.order = (content, db) => {
  state.databases[db].table_order = content;
};

//triggers.table.close(state.database, state.table);

//triggers.table.close(state.database, state.table);
set.table.name = (db, tb) => {
  state.database = db;
  state.table = tb;

  if (table) {
    triggers.table.activate();
  }
};

// Item
set.table.item = (content, db, tb) => {
  state.databases[db].table_items[tb] = content;
};

// Items
set.table.items = (content, db) => {
  content.forEach((item) => {
    state.databases[db].table_items[item] = {};
  });

  triggers.table.items(db);
};
