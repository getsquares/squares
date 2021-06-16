set.table = {};
set.pending = {};
set.new = {};
set.field = {};

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

set.new.data = (content, is_null, context) => {
  const { db, tb, col, row, index } = get.dom.cell.data(context);
  const data = state?.databases[db]?.table_items[tb]?.rows?.[index];

  if (!data) return;

  const value = is_null ? null : content;

  data[`${col}:value`] = value;
  data[`${col}:buffer`] = content;
};

// Set nulled
set.new.nulled = (is_null, context) => {
  const { db, tb, col, row, index } = get.dom.cell.data(context);
  const data = state?.databases[db]?.table_items[tb]?.rows?.[index];

  if (!data) return;

  let fallback = null;

  if (data?.[`${col}:buffer`] !== undefined) {
    fallback = data[`${col}:buffer`];
  } else {
    fallback = data[col];
  }

  // state.databases[db][tb].updates[`${row}:${col}`] = "";

  data[`${col}:value`] = is_null ? null : fallback;

  set.new.updates(data, context);

  triggers.cell.state(data, col, context);
};

// Set buffer
set.new.buffer = (content, context) => {
  const { db, tb, col, row, index } = get.dom.cell.data(context);
  const data = state?.databases[db]?.table_items[tb]?.rows?.[index];

  if (!data) return;

  data[`${col}:buffer`] = content;
  if (data?.[`${col}:value`] !== null) {
    data[`${col}:value`] = content;
  }

  set.new.updates(data, context);

  triggers.cell.state(data, col, context);
};

set.new.updates = (data, context) => {
  const { db, tb, col, row, index } = get.dom.cell.data(context);

  if (!state?.databases?.[db]?.table_items?.[tb]?.updates) {
    state.databases[db].table_items[tb].updates = {};
  }

  if (data[col] !== data[`${col}:value`]) {
    state.databases[db].table_items[tb].updates[`${index}:${col}`] = {
      content: data[`${col}:value`],
      col: col,
      row: row,
      index: index,
    };
  } else {
    delete state.databases[db].table_items[tb].updates[`${index}:${col}`];
  }
};

// Items
set.table.items = (content, db) => {
  content.forEach((item) => {
    state.databases[db].table_items[item] = {};
  });

  triggers.tb.items(db);
};

set.field.config = (name, config) => {
  state.fields[name] = {};
  state.fields[name].config = config;
};

var test = [];

test[3] = "Hello";
