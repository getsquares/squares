class table {
  static get(obj) {
    let main = obj;
    if (obj.tagName != "PANE-MAIN") {
      main = obj.closest("pane-main");
    }

    return `${main.getAttribute("database")} ${main.getAttribute("table")}`;
  }
}
