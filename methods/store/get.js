get.db = {};
get.tb = {};

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
