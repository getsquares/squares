get.db = {};
get.tb = {};
get.col = {};

// Database
/*get.db.items = (db = state.database) => {
  return state.databases[db];
};*/

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

get.col.data = (db, tb, col) => {
  const data = get.tb.items(db, tb);

  return data.cols[col];
};
