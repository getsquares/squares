triggers.tb = {};

triggers.tb.activate = () => {
  $(`db-list`).deactivateTb();
  $(`db-list`).activateTb();
  $(`tab-items`).activate();
};

triggers.tb.closeTab = (db, tb) => {
  $(`db-list`).deactivateTb();
  $(`tab-items`).close(db, tb);
};

triggers.tb.items = (db) => {
  $(`db-list`).tablesPopulate(db);
  $(`db-list`).hideElement("tb-loading", db);
};

triggers.tb.data = () => {
  $("main-x").deactivatePanes();
  $("main-x").addPane();
};
