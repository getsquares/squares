actions.table = {};
actions.tables = {};

// Table
actions.table.load = (db, tb) => {
  if (isEmpty(get.tb.items(db, tb))) {
    axios
      .get(`server/php/queries/data.php?database=${db}&table=${tb}`)
      .then((response) => {
        if (response.status !== 200) return;

        actions.table.activate(db, tb);

        set.table.item(response.data, db, tb);
      });
  } else {
    actions.table.activate(db, tb);
  }
};

// Tables
actions.tables.load = (db) => {
  axios.get(`server/php/queries/tables.php?database=${db}`).then((response) => {
    if (response.status !== 200) return;

    set.table.order(response.data, db);
    set.table.items(response.data, db);
  });
};

actions.table.activate = (db, tb) => {
  set.table.name(db, tb);
};

actions.table.closeTab = (db, tb) => {
  set.table.item({}, db, tb);
  set.table.name(null, null);
};
