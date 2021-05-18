var set = {
  // Database
  databaseItems: (content) => {
    state.databases = {};

    content.forEach((item) => {
      state.databases[item] = {
        open: false,
        table_order: [],
        table_items: {},
      };
    });
  },
  databaseOrder: (content) => {
    state.databases_order = content;
  },
  database: (database) => {
    state.database = database;
  },
  databaseState: (is_open, database) => {
    state.databases[database].open = is_open;
  },
  // Tables

  tableItems: (content, database) => {
    content.forEach((item) => {
      state.databases[database].table_items[item] = {
        name: item,
      };
    });

    triggers.tableItems(database);
  },
};

set.tableOrder = (content, database) => {
  state.databases[database].table_order = content;
};
