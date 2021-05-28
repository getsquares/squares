set.table = {};
set.pending = {};

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

set.pending.update = (content, context) => {
  const { db, tb, col, row, index } = get.dom.cell.data(context);

  const data = state?.databases[db]?.table_items[tb];
  const original = get.tb.value(db, tb, col, index);

  if (!data?.pending_updates) {
    data.pending_updates = {};
  }

  if (!data?.pending_updates[row]) {
    data.pending_updates[row] = {};
  }

  if (original !== content) {
    data.pending_updates[row][col] = content;
    context.closest("table-cell").setAttribute("state", "changed");
  } else {
    delete data.pending_updates[row][col];

    if (!data?.pending_updates[row]) {
      delete data.pending_updates[row];
    }

    if (!data?.pending_updates) {
      delete data.pending_updates;
    }

    triggers.cell.update(context);
    // Se till att null accepteras som värde
  }

  // Ta bort tomma
};

// Items
set.table.items = (content, db) => {
  content.forEach((item) => {
    state.databases[db].table_items[item] = {};
  });

  triggers.tb.items(db);
};

var test = [];

test[3] = "Hello";
