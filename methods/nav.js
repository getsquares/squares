nav.db = {};
nav.tb = {};

nav.tb.section = (db) => {
  return $(`nav-tb-section`, nav.db.group(db));
};

nav.db.item = (db) => {
  return $(`nav-db[db="${db}"]`);
};

nav.db.group = (db) => {
  return $(`nav-db[db="${db}"]`).closest("nav-db-group");
};

nav.tb.item = () => {
  const db_el = $(`nav-db[db="${state.database}"]`);
  return $(`nav-tb[tb="${state.table}"]`, db_el.closest("nav-db-group"));
};

nav.tb.group = (db) => {
  return $("nav-tb-group", nav.db.group(db));
};

nav.arrow = (db) => {
  return $(`nav-db[db="${db}"] [arrow]`);
};
