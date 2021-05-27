// Leave edit
function leaveEdit(el) {
  in_field = true;

  fieldClose(el);
}

// Field close helper
function fieldClose(el) {
  const table_cell = el.closest("table-cell");

  if (!$('cell-ring[state="edit"]', table_cell)) return;

  $("cell-ring", table_cell).setAttribute("state", "active");
  $("cell-edit", table_cell).hidden = true;
}
