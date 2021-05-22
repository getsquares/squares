set.table = {};

// Order
set.table.order = (content, db) => {
  state.databases[db].table_order = content;
};

set.table.name = (db, tb) => {
  const old_db = state.database;
  const old_tb = state.table;

  state.database = db;
  state.table = tb;

  if (state.table) {
    triggers.tb.activate();
  } else {
    triggers.tb.closeTab(old_db, old_tb);
  }
};

// Item
set.table.item = (content, db, tb) => {
  state.databases[db].table_items[tb] = content;

  triggers.tb.data();
};

// Items
set.table.items = (content, db) => {
  content.forEach((item) => {
    state.databases[db].table_items[item] = {};
  });

  triggers.tb.items(db);
};
