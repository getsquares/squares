get.db = {};
get.tb = {};
get.col = {};
get.dom = {};
get.dom.cell = {};
get.new = {};

// Database
/*get.db.items = (db = state.database) => {
  return state.databases[db];
};*/

get.dom.cell.data = (context) => {
  const root = context.closest("pane-main");
  const table_cell = context.closest("table-cell");
  const db = root.db;
  const tb = root.tb;
  const col = table_cell.getAttribute("col");
  const row = table_cell.getAttribute("row");
  const index = table_cell.getAttribute("index");

  return { db, tb, col, row, index };
};

// Table
get.tb.order = () => {
  return state.databases[state.database].tables_order;
};

get.tb.items = (db = state.database, tb = state.table) => {
  return state.databases[db].table_items[tb];
};

get.tb.value = (db, tb, col, index) => {
  const data = get.tb.items(db, tb);

  return data.rows[index][col];
};

// Get new value or preview
get.new.param = (context, type) => {
  const { db, tb, col, index } = get.dom.cell.data(context);
  const data = get.tb.items(db, tb);

  const new_value = data?.rows?.[index]?.[`${col}":"${type}`];
  if (new_value === undefined) return;

  return new_value;
};

get.tb.updated = (db, tb, row, col, index) => {
  const data = get.tb.items(db, tb);
  const updated = data?.pending_updates?.[row]?.[col];

  if (updated) return updated;

  return data.rows[index][col];
};

get.col.data = (db, tb, col) => {
  const data = get.tb.items(db, tb);

  return data.cols[col];
};
