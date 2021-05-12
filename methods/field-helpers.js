// Leave edit
function leaveEdit() {
  in_field = true;

  fieldClose();
}

// Field close helper
function fieldClose() {
  const el_cell_ring = $('cell-ring[state="edit"]');

  if (!el_cell_ring) return;

  const el_table_cell = el_cell_ring.closest("table-cell");
  const el_cell_edit = $("cell-edit", el_table_cell);

  el_cell_ring.setAttribute("state", "active");
  el_cell_edit.removeAttribute("active");
}
