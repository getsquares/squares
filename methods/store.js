// Spread dom cell
function spreadDomCell(el_table_cell) {
  return (current = {
    table_cell: el_table_cell,
    cell_ring: el_table_cell.querySelector("cell-ring"),
    cell_edit: el_table_cell.querySelector("cell-edit"),
    cell_preview: el_table_cell.querySelector("cell-preview"),
  });
}

// Reset store
function resetStore() {
  dom.current = null;
  dom.left = null;
  dom.right = null;
  dom.up = null;
  dom.down = null;
}

// Store dom cell
function storeDomCell(el_table_cell) {
  dom.current = spreadDomCell(el_table_cell);
  dom.left = spreadDomCell(getDomCellLeft());
  dom.right = spreadDomCell(getDomCellRight());
  dom.down = spreadDomCell(getDomCellDown());
  dom.up = spreadDomCell(getDomCellUp());
}
