class UpdateClass {
  constructor() {}

  initByContext(context) {
    const args = get.dom.cell.data(context);
    this.argsToObject(args);
  }

  argsToObject({ db, tb, row, col, index }) {
    this.db = db;
    this.tb = tb;
    this.row = row;
    this.col = col;
    this.index = index;
    this.data = state?.databases[this.db]?.table_items[this.tb];
    this.old_value = get.tb.value(this.db, this.tb, this.col, this.index);
  }

  setNewValue(value) {
    this.new_value = value;
  }

  // STORE ADD

  storeAddUpdated() {
    if (this.hasStoreUpdated()) return;
    this.data.pending_updates = {};
  }

  storeAddRow() {
    if (this.hasStoreRow()) return;
    this.storeAddUpdated();
    this.data.pending_updates[this.row] = {};
  }

  storeAddCol() {
    if (this.hasStoreCol()) return;
    this.storeAddRow();
    this.data.pending_updates[this.row][this.col] = {};
  }

  storeAddValue(value) {
    this.storeAddCol();
    this.data.pending_updates[this.row][this.col].value = value;
  }

  storeAddIsNull(is_null) {
    this.storeAddCol();
    this.data.pending_updates[this.row][this.col].is_null = is_null;
  }

  // IS

  isUniqueValue() {
    if (this.hasStoreValue() === undefined) return false;

    return this.getStoreValue() === this.old_value;
  }

  isUniqueNull() {
    if (this.hasStoreIsNull() === undefined) return false;

    const is_old_null = this.old_value === null ? true : false;

    return this.getStoreIsNull() === is_old_null;
  }

  isDiff() {
    return !this.isUniqueValue() || !this.isNull();
  }

  // GET

  getStoreValue() {
    return this.data.pending_updates[this.row][this.col].value;
  }

  getStoreIsNull() {
    return this.data.pending_updates[this.row][this.col].is_null;
  }

  // HAS

  hasStoreUpdated() {
    return this.data?.pending_updates;
  }
  hasStoreRow() {
    return this.data?.pending_updates?.[this.row];
  }
  hasStoreCol() {
    return this.data?.pending_updates?.[this.row]?.[this.col];
  }
  hasStoreValue() {
    return this.data?.pending_updates?.[this.row]?.[this.col]?.value;
  }
  hasStoreIsNull() {
    return this.data?.pending_updates?.[this.row]?.[this.col]?.is_null;
  }

  // REMOVE

  removeValue() {
    if (!this.hasStoreValue()) return;
    delete this.data.pending_updates[this.row][this.col].value;
  }
  removeIsNull() {
    if (!this.hasStoreIsNull()) return;
    delete this.data.pending_updates[this.row][this.col].is_null;
  }
  removeCol() {
    if (!this.hasStoreCol()) return;
    delete this.data.pending_updates[this.row][this.col];
  }
  removeRow() {
    if (!this.hasStoreRow()) return;
    delete this.data.pending_updates[this.row];
  }
  removeUpdated() {
    if (!this.hasStoreUpdated()) return;
    delete this.data.pending_updates;
  }
}
/*
context

setNewPreview(value) returnera om value är null
setNewValue(value)

isNewValueEqualsOldValue(index)
isNewValueNull

addNewId(id)
deleteNewId(id)
*/

const test2 = new UpdateClass({ db: "test", tb: "asda" });
