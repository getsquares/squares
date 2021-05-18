var triggers = {
  databaseLoad: () => {
    $("sidebar-databases").populate();
  },
  databaseToggle: (database) => {
    const current_database = $(`sidebar-database[database="${database}"]`);

    if (state.databases[database].open) {
      current_database.open();
      if ($("sidebar-tables", current_database).isEmpty()) {
        console.log("em");
        actions.tablesLoad(database);
      }
    } else {
      current_database.close();
    }
  },
};

triggers.tableItems = (database) => {
  $(`sidebar-database[database="${database}"] sidebar-tables`).populate(
    database
  );
};
