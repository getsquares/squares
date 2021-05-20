actions.database = {};
actions.databases = {};

// Databases
actions.databases.load = () => {
  axios.get("server/php/queries/databases.php").then((response) => {
    if (response.status !== 200) return;

    set.database.order(response.data);
    set.database.items(response.data);
  });
};

// Database
actions.database.toggle = (db) => {
  set.database.toggleState(db);
};
