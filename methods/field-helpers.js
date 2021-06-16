// Leave edit
function leaveEdit(el) {
  in_field = true;

  fieldClose(el);

  debug("cell", JSON.stringify(cellData(), null, 4), "textarea");
}

// Field close helper
function fieldClose(el) {
  const table_cell = el.closest("table-cell");
  const mode = table_cell.getAttribute("mode");

  if (!$('cell-ring[state="edit"]', table_cell)) return;

  $("cell-preview", table_cell).hidden = false;
  $("cell-ring", table_cell).setAttribute("state", "active");
  $(`cell-edit-${mode}`, table_cell).hidden = true;
}
