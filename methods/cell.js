class cell {
  static setPreview(html, obj) {
    $("preview-value", obj.closest("table-cell")).innerHTML = html;
  }

  static setTempValue(value, obj) {
    const db_table = table.get(obj);
    console.log(db_table);
    const temp_data = temp[row.getType(obj)][db_table].data;
    temp_data[row.getIndex(obj)][cell.getColumn(obj)] = value;
  }

  static getTempValue(obj) {
    const db_table = table.get(obj);
    const temp_data = temp[row.getType(obj)][db_table].data;
    return temp_data[row.getIndex(obj)][cell.getColumn(obj)];
  }

  static getValue(obj) {
    const table_cell = obj.closest("table-cell");
    const pane_main = obj.closest("pane-main");

    const db = pane_main.db;
    const tb = pane_main.tb;
    const col = table_cell.col;
    const index = table_cell.index;

    return get.tb.value(db, tb, col, index);
  }

  static getColumn(obj) {
    return obj.closest("table-cell").getAttribute("column");
  }

  static isNullable() {
    return obj.closest("table-cell").getAttribute("nullable") == "true"
      ? true
      : false;
  }

  static isNull() {
    return obj.closest("table-cell").getAttribute("is_null") == "true"
      ? true
      : false;
  }
}
