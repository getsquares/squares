var actions = {
  // Database
  databasesLoad: () => {
    axios.get("server/php/queries/databases.php").then((response) => {
      if (response.status !== 200) return;

      set.databaseOrder(response.data);
      set.databaseItems(response.data);

      triggers.databaseLoad();
    });
  },
  databaseToggle(is_open, database) {
    set.databaseState(is_open, database);
    triggers.databaseToggle(database);
  },
  // Tables
  tablesLoad(database) {
    axios
      .get(`server/php/queries/tables.php?database=${database}`)
      .then((response) => {
        if (response.status !== 200) return;

        set.tableOrder(response.data, database);
        set.tableItems(response.data, database);

        console.log(state);
      });
  },
};
