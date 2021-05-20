triggers.table = {};

triggers.table.activate = () => {
  $$(`nav-tb`).forEach((el) => {
    el.removeAttribute("active");
  });
  nav.tb.item().activate();
  $(`tab-items`).activate();
};

triggers.table.close = (db, tb) => {
  $(`nav-db-groups`).tablesDeactivate();
  $(`tab-items`).close(db, tb);
};

triggers.table.items = (db) => {
  const db_group = $(`nav-db[db="${db}"]`).parentElement;
  $(`nav-db-groups`).tablesPopulate(db);
  $(`nav-tb-section`, db_group).removeAttribute("hidden");
  $(`nav-loading`, db_group).setAttribute("hidden", "");
};
