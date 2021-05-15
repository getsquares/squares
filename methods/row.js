class row {
  static isNew(obj) {
    return obj.closest(".row-new") ? true : false;
  }

  static getType(obj) {
    return row.isNew(obj) ? "insert" : "update";
  }

  static getIndex(obj) {
    return obj.closest("table-row").dataset.index;
  }
}
