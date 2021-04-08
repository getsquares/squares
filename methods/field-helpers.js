// Leave edit
function leaveEdit() {
  in_field = true;
  resetDomCellEdits();
  const el_edit = document.querySelector(`cell-ring[state="edit"]`);
  if (!el_edit) return;
  el_edit.setAttribute("state", "active");
}

// Field close helper
function fieldClose() {
  handleCellClose();
}
